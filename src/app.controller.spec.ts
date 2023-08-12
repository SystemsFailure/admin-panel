import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/users.service';

describe('AppController', () => {
  let userController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    userController = app.get<UsersController>(UsersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userController.get).toBe('Hello World!'); // Здесь поменять метод toBe() для того, что бы работали тесты.
    });
  });
});
