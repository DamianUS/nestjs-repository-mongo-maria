import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { validate } from 'class-validator';
import { faker } from '@faker-js/faker';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseModule } from '../database/database.module';
import { userRepository } from './model/providers/user.repository';
import { userFactory } from './model/providers/user.factory';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UsersService, { ...userRepository }, { ...userFactory }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should raise validation error when trying to insert an empty user', async () => {
      const invalidUserDTO = new CreateUserDto();
      const validationErrors = await validate(invalidUserDTO);
      expect(validationErrors.length).toBeGreaterThan(0);
    });
    it('should insert a valid user', async () => {
      const validUserData = {
        email: faker.internet.email(),
        password: 'secret',
        firstName: 'Damián',
      };
      const validUserDTO = new CreateUserDto();
      Object.assign(validUserDTO, validUserData);
      const errors = await validate(validUserDTO);
      const insertedUser = await service.create(validUserDTO);
      expect.assertions(2);
      expect(errors.length).toEqual(0);
      const isInsertedDataValid =
        insertedUser.firstName === validUserData.firstName &&
        insertedUser.password !== validUserData.password &&
        insertedUser.email === validUserData.email;
      expect(isInsertedDataValid).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should raise validation error when trying to insert an empty user', async () => {
      const invalidUserDTO = new UpdateUserDto();
      const validationErrors = await validate(invalidUserDTO);
      expect(validationErrors.length).toBeGreaterThan(0);
    });
    it('should update a valid user', async () => {
      const lastUserInserted = await service.findLast();
      const validUserData = {
        email: faker.internet.email(),
        firstName: 'DamiánEditado',
      };
      const validUserDTO = new UpdateUserDto();
      Object.assign(validUserDTO, validUserData);
      const errors = await validate(validUserDTO);
      const updatedUser = await service.update(
        lastUserInserted.id,
        validUserDTO,
      );
      expect.assertions(2);
      expect(errors.length).toEqual(0);
      const isInsertedDataValid =
        updatedUser.firstName === validUserData.firstName &&
        updatedUser.password === lastUserInserted.password &&
        updatedUser.email === validUserData.email;
      expect(isInsertedDataValid).toBeTruthy();
    });
  });
});
