import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../../../constants';
import { ConfigService } from '@nestjs/config';
import UserEntityMongodbTypeorm from '../../../users/model/entities/typeorm/mongodb/user.entity.mongodb.typeorm';
import UserEntityMariadbTypeorm from '../../../users/model/entities/typeorm/mariadb/user.entity.mariadb.typeorm';

export const createMariaDBDataSource = (
  configService: ConfigService,
): DataSource => {
  return new DataSource({
    type: 'mariadb',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    entities: [UserEntityMariadbTypeorm],
    synchronize: true,
  });
};
