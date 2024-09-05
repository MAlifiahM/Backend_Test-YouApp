import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

jest.mock('../../src/auth/auth.service');

describe('Auth Controller', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('register', () => {
    const body = {
      username: 'testUser',
      password: 'testPassword',
      email: 'testEmail',
    };

    it('should call register on the service with correct parameters', async () => {
      authService.register = jest.fn().mockResolvedValueOnce(null);

      await authController.register(body);

      expect(authService.register).toHaveBeenCalledWith(
        body.username,
        body.password,
        body.email,
      );
    });

    it('should throw an error if service throws an error', async () => {
      authService.register = jest
        .fn()
        .mockRejectedValueOnce(new BadRequestException('user already exists'));

      await expect(authController.register(body)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('login', () => {
    const body = {
      username: 'testUser',
      email: 'testEmail',
      password: 'testPassword',
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    it('should call login on the service with correct parameters', async () => {
      authService.login = jest.fn().mockResolvedValueOnce('testToken');

      await authController.login(body, res as any);

      expect(authService.login).toHaveBeenCalledWith(
        body.username,
        body.email,
        body.password,
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: 'testToken' });
    });

    it('should throw an error if service throws an error', async () => {
      authService.login = jest
        .fn()
        .mockRejectedValueOnce(
          new UnauthorizedException('Invalid credentials'),
        );

      await expect(authController.login(body, res as any)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
