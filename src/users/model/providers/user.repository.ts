import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DATA_SOURCE, USER_REPOSITORY } from '../../../constants';
import TypeORMRepository from '../../../database/repositories/typeorm/TypeORMRepository';
import User from '../entities/user.entity';
import UserEntityMongodbTypeorm from '../entities/typeorm/mongodb/user.entity.mongodb.typeorm';
import UserEntityMariadbTypeorm from '../entities/typeorm/mariadb/user.entity.mariadb.typeorm';
import TypeORMMariaRepository from '../../../database/repositories/typeorm/TypeORMMariaRepository';
import TypeORMMongoRepository from '../../../database/repositories/typeorm/TypeORMMongoRepository';

const getUserRepositoryMariaDbTypeorm = (dataSource: DataSource) => {
  return new TypeORMMariaRepository<User, UserEntityMongodbTypeorm>(
    UserEntityMariadbTypeorm,
    dataSource,
  );
};

const getUserRepositoryMongodbTypeorm = (dataSource: DataSource) => {
  return new TypeORMMongoRepository<User, UserEntityMongodbTypeorm>(
    UserEntityMongodbTypeorm,
    dataSource,
  );
};

export const userRepository = {
  provide: USER_REPOSITORY,
  inject: [ConfigService, DATA_SOURCE],
  useFactory: async (configService: ConfigService, dataSource: DataSource) => {
    if (configService.get<string>('DATABASE') === 'mongodb') {
      return getUserRepositoryMongodbTypeorm(dataSource);
    } else if (configService.get<string>('DATABASE') === 'mariadb') {
      return getUserRepositoryMariaDbTypeorm(dataSource);
    }
  },
};
