import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './model/entities/user.entity';
import { ObjectId } from 'typeorm';
import { USER_FACTORY, USER_REPOSITORY } from '../constants';
import { Repository } from '../database/repositories/Repository';
import EntityFactory from '../database/factories/EntityFactory';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly usersRepository: Repository<User>,
    @Inject(USER_FACTORY) private readonly usersFactory: EntityFactory<User>,
  ) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    // Using save because insert won't trigger BeforeInsert https://github.com/typeorm/typeorm/issues/8706
    return this.usersRepository.save(
      this.usersFactory.getInstanceFromPartial(createUserDto),
    );
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: ObjectId | number | string): Promise<User> {
    return this.usersRepository.findOneById(id);
  }

  findLast(): Promise<User> {
    return this.usersRepository.findLast();
  }

  async update(
    id: ObjectId | number | string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: ObjectId | number | string) {
    await this.usersRepository.remove(id);
  }
}
