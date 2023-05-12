import { ObjectId } from 'typeorm';

export interface Repository<T> {
  find: () => Promise<T[]>;
  findOneById: (id: string | ObjectId | number) => Promise<T>;
  findLast: () => Promise<T>;
  save: (entity: T) => Promise<T>;
  update: (id: string | ObjectId | number, updateDTO: Partial<T>) => Promise<T>;
  remove: (id: string | ObjectId | number) => Promise<void>;
}
