import { BaseEntity } from 'typeorm';

export default class BaseRelationalEntity extends BaseEntity {
  _id: number;

  get id(): number {
    return this._id;
  }

  set id(value: number | string) {
    if (typeof value === 'string') {
      this._id = +value;
    } else {
      this._id = value;
    }
  }
}
