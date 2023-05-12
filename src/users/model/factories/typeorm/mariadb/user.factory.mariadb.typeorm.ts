import User from '../../../entities/user.entity';
import UserEntityMongodbTypeorm from '../../../entities/typeorm/mongodb/user.entity.mongodb.typeorm';
import EntityFactory from '../../../../../database/factories/EntityFactory';
import UserEntityMariadbTypeorm from '../../../entities/typeorm/mariadb/user.entity.mariadb.typeorm';

export class UserFactoryMariadbTypeorm implements EntityFactory<User> {
  getInstance(): User {
    return new UserEntityMariadbTypeorm();
  }

  getInstanceFromPartial(partial: Partial<User>): User {
    return UserEntityMariadbTypeorm.fromPartial(partial);
  }
}
