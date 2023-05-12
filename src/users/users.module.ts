import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { userRepository } from './model/providers/user.repository';
import { userFactory } from './model/providers/user.factory';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, { ...userRepository }, { ...userFactory }],
})
export class UsersModule {}
