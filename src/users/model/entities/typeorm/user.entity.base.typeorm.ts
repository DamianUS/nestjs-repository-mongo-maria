import { BeforeInsert, Column, Entity, ObjectId } from 'typeorm';
import { Exclude } from 'class-transformer';
import User from '../user.entity';
import * as bcrypt from 'bcrypt';

@Entity('users')
export default class UserEntityBaseTypeorm implements User {
  _id: ObjectId | number;
  @Column() _email: string;

  @Exclude() @Column() _password: string;

  @Column() _firstName: string;
  get id(): ObjectId | number {
    return this._id;
  }

  set id(value: ObjectId | string | number) {
    if (typeof value === 'string') {
      throw new Error(
        'A Base Entity does not know how to convert a string id -> to number (MariaDB) or ObjectID (MongoDB)?',
      );
    } else {
      this._id = value;
    }
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = this.hashPassword(value);
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }
  static fromPartial(partial: Partial<User>): UserEntityBaseTypeorm {
    const newUser = new UserEntityBaseTypeorm();
    newUser.id = partial.id as string | ObjectId | number;
    newUser.email = partial.email;
    newUser.password = partial.password;
    newUser.firstName = partial.firstName;
    return newUser;
  }

  hashPassword(clearPassword: string): string {
    const saltRounds = 10;
    return bcrypt.hashSync(clearPassword, saltRounds);
  }
}
