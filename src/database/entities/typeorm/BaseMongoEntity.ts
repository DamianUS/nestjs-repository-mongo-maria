import { BaseEntity, ObjectId } from 'typeorm';

export default class BaseMongoEntity extends BaseEntity {
  _id: ObjectId;

  get id(): ObjectId {
    return this._id;
  }

  set id(value: ObjectId | string) {
    if (typeof value === 'string') {
      this._id = new ObjectId(value);
    } else {
      this._id = value;
    }
  }
}
