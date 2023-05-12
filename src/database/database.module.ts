import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { datasource } from './providers/datasource';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [{ ...datasource }],
  exports: [{ ...datasource }],
})
export class DatabaseModule {}
