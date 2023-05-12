import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../../constants';
import { ConfigService } from '@nestjs/config';
import { createMongoDBDataSource } from '../datasources/typeorm/mongodb.typeorm.datasource';
import { createMariaDBDataSource } from '../datasources/typeorm/mariadb.typeorm.datasource';

export const datasource = {
  provide: DATA_SOURCE,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    if (configService.get<string>('DATABASE') === 'mongodb') {
      return await createMongoDBDataSource(configService).initialize();
    } else if (configService.get<string>('DATABASE') === 'mariadb') {
      return await createMariaDBDataSource(configService).initialize();
    }
  },
};
