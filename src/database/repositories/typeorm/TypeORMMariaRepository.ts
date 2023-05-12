import {
  Repository as ORMRepository,
  DataSource,
  ObjectType,
  ObjectId,
  Not,
  IsNull,
} from 'typeorm';
import { Repository } from '../Repository';
import Entity from '../../entities/Entity';
import BaseEntity from '../../entities/BaseEntity';
import TypeORMRepository from './TypeORMRepository';

const convertIdToNumber = (id: string | number): number => {
  const numericId = typeof id === 'string' ? +id : id;
  return numericId;
};
export default class TypeORMMariaRepository<
  T extends Entity,
  R extends T & BaseEntity,
> extends TypeORMRepository<T, R> {
  async findOneById(id: string | number): Promise<T> {
    return super.findOneById(convertIdToNumber(id));
  }

  async update(id: string | number, updateDTO: Partial<T>): Promise<T> {
    return await super.update(id, updateDTO);
  }

  async remove(id: string | number): Promise<void> {
    await super.remove(id);
  }

  async findLast(): Promise<T> {
    return this.repository.findOne({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      where: {
        _id: Not(IsNull()),
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      order: { _id: 'DESC' },
    });
  }
}
