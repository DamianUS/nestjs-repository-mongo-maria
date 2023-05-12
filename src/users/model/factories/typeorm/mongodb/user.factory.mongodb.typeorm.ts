import User from '../../../entities/user.entity';
import UserEntityMongodbTypeorm from '../../../entities/typeorm/mongodb/user.entity.mongodb.typeorm';
import EntityFactory from '../../../../../database/factories/EntityFactory';

export class UserFactoryMongodbTypeorm implements EntityFactory<User> {
  getInstance(): User {
    return new UserEntityMongodbTypeorm();
  }

  getInstanceFromPartial(partial: Partial<User>): User {
    return UserEntityMongodbTypeorm.fromPartial(partial);
  }
}
