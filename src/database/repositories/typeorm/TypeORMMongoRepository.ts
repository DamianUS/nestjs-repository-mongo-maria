import {
  Repository as ORMRepository,
  DataSource,
  ObjectType,
  ObjectId,
} from 'typeorm';
import { Repository } from '../Repository';
import Entity from '../../entities/Entity';
import BaseEntity from '../../entities/BaseEntity';
import TypeORMRepository from './TypeORMRepository';

const convertIdToObjectId = (id: string | ObjectId): ObjectId => {
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return objectId;
};
export default class TypeORMMongoRepository<
  T extends Entity,
  R extends T & BaseEntity,
> extends TypeORMRepository<T, R> {
  async findOneById(id: string | ObjectId): Promise<T> {
    return super.findOneById(convertIdToObjectId(id));
  }

  async update(id: string | ObjectId, updateDTO: Partial<T>): Promise<T> {
    return await super.update(id, updateDTO);
  }

  async remove(id: string | ObjectId): Promise<void> {
    await super.remove(id);
  }
}
