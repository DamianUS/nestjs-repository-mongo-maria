import { ConfigService } from '@nestjs/config';
import { USER_FACTORY } from '../../../constants';
import { UserFactoryMongodbTypeorm } from '../factories/typeorm/mongodb/user.factory.mongodb.typeorm';
import { UserFactoryMariadbTypeorm } from '../factories/typeorm/mariadb/user.factory.mariadb.typeorm';

export const userFactory = {
  provide: USER_FACTORY,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    if (configService.get<string>('DATABASE') === 'mongodb') {
      return new UserFactoryMongodbTypeorm();
    } else if (configService.get<string>('DATABASE') === 'mariadb') {
      return new UserFactoryMariadbTypeorm();
    }
  },
};
