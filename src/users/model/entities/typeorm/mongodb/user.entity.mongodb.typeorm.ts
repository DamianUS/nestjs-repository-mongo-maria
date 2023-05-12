import { Entity, ObjectIdColumn, ObjectId } from 'typeorm';
import User from '../../user.entity';
import UserEntityBaseTypeorm from '../user.entity.base.typeorm';

@Entity('users')
export default class UserEntityMongodbTypeorm
  extends UserEntityBaseTypeorm
  implements User
{
  @ObjectIdColumn() _id: ObjectId;

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
