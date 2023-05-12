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

export default class TypeORMRepository<
  T extends Entity,
  R extends T & BaseEntity,
> implements Repository<T>
{
  repository: ORMRepository<R>;
  constructor(entityClass: ObjectType<R>, dataSource: DataSource) {
    this.repository = dataSource.getRepository(entityClass);
  }

  async find(): Promise<T[]> {
    return this.repository.find();
  }

  async findLast(): Promise<T> {
    return this.repository.findOne({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      order: { _id: 'DESC' },
    });
  }

  async findOneById(id: string | ObjectId | number): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.repository.findOneBy({ _id: id });
  }

  async save(entity: T): Promise<T> {
    const convertedEntity: R = entity as unknown as R;
    return this.repository.save(convertedEntity);
  }

  async update(
    id: string | ObjectId | number,
    updateDTO: Partial<T>,
  ): Promise<T> {
    await this.repository.update(
      id,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      BaseEntity.getPropertiesObjectFromDto(updateDTO),
    );
    return this.findOneById(id);
  }

  async remove(id: string | ObjectId | number): Promise<void> {
    await this.repository.delete(id);
  }
}
