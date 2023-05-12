import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../../../constants';
import { ConfigService } from '@nestjs/config';
import UserEntityMongodbTypeorm from '../../../users/model/entities/typeorm/mongodb/user.entity.mongodb.typeorm';

export const createMongoDBDataSource = (
  configService: ConfigService,
): DataSource => {
  return new DataSource({
    type: 'mongodb',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    entities: [UserEntityMongodbTypeorm],
  });
};
