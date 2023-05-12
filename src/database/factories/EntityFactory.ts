import Entity from '../entities/Entity';

export default interface EntityFactory<T extends Entity> {
  getInstance(): T;
  getInstanceFromPartial(partial: Partial<T>): T;
}
