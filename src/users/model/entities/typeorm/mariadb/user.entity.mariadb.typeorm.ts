import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import User from '../../user.entity';
import UserEntityBaseTypeorm from '../user.entity.base.typeorm';

@Entity('users')
export default class UserEntityMariadbTypeorm
  extends UserEntityBaseTypeorm
  implements User
{
  @PrimaryGeneratedColumn() _id: number;

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
