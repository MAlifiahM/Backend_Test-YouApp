import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/user/user.controller';
import { UserService } from '../../src/user/user.service';
import { CreateUserProfileDto } from '../../src/user/dto/create-user-profile.dto';
import { UpdateUserProfileDto } from '../../src/user/dto/update-user-profile.dto';
import { Response } from 'express';

jest.mock('../../src/user/user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('createProfile', () => {
    it('should return created profile data successfully', async () => {
      const req = { user: { userId: 'user123' } } as any;
      const createProfileDto: CreateUserProfileDto = {
        displayName: 'User',
        gender: 'male',
        dateOfBirth: '01-08-1999',
        height: 175,
        weight: 80,
        interests: ['coding', 'gaming'],
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any as Response;

      const createdProfile = {
        _id: 'profile123',
        password: 'hashedpassword',
        __v: 0,
        username: 'testuser',
        email: 'test@example.com',
        displayName: 'User',
        gender: 'male',
        dateOfBirth: '01-08-1999',
        height: 175,
        weight: 80,
        interests: ['coding', 'gaming'],
        toObject: jest.fn().mockReturnValue({
          displayName: 'User',
          gender: 'male',
          dateOfBirth: '01-08-1999',
          height: 175,
          weight: 80,
          interests: ['coding', 'gaming'],
        }),
      };

      (userService.createProfile as jest.Mock).mockResolvedValue(
        createdProfile,
      );

      await userController.createProfile(req, createProfileDto, res as any);

      expect(userService.createProfile).toHaveBeenCalledWith(
        req.user.userId,
        createProfileDto,
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Profile created successfully',
        data: {
          displayName: 'User',
          gender: 'male',
          dateOfBirth: '01-08-1999',
          height: 175,
          weight: 80,
          interests: ['coding', 'gaming'],
        },
      });
    });

    it('should return error message on failure', async () => {
      const req = { user: { userId: 'user123' } } as any;
      const createProfileDto: CreateUserProfileDto = {
        displayName: 'User',
        gender: 'male',
        dateOfBirth: '1999-08-01',
        height: 175,
        weight: 80,
        interests: ['coding', 'gaming'],
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any as Response;

      const error = new Error('Profile creation failed');

      (userService.createProfile as jest.Mock).mockRejectedValue(error);

      await userController.createProfile(req, createProfileDto, res as any);

      expect(userService.createProfile).toHaveBeenCalledWith(
        req.user.userId,
        createProfileDto,
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: error.message,
        data: null,
      });
    });

    describe('getProfile', () => {
      it('should return profile data successfully', async () => {
        const req = { user: { userId: 'user123' } } as any;
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as any as Response;

        const retrievedProfile = {
          _id: 'profile123',
          password: 'hashedpassword',
          __v: 0,
          username: 'testuser',
          email: 'test@example.com',
          displayName: 'User',
          gender: 'male',
          dateOfBirth: '01-08-1999',
          height: 175,
          weight: 80,
          interests: ['coding', 'gaming'],
          toObject: jest.fn().mockReturnValue({
            displayName: 'User',
            gender: 'male',
            dateOfBirth: '01-08-1999',
            height: 175,
            weight: 80,
            interests: ['coding', 'gaming'],
          }),
        };

        (userService.getProfile as jest.Mock).mockResolvedValue(
          retrievedProfile,
        );

        await userController.getProfile(req, res as any);

        expect(userService.getProfile).toHaveBeenCalledWith(req.user.userId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Profile retrieved successfully',
          data: {
            displayName: 'User',
            gender: 'male',
            dateOfBirth: '01-08-1999',
            height: 175,
            weight: 80,
            interests: ['coding', 'gaming'],
          },
        });
      });

      it('should return error message on failure', async () => {
        const req = { user: { userId: 'user123' } } as any;
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as any as Response;

        const error = new Error('Failed to retrieve profile');

        (userService.getProfile as jest.Mock).mockRejectedValue(error);

        await userController.getProfile(req, res as any);

        expect(userService.getProfile).toHaveBeenCalledWith(req.user.userId);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          message: error.message,
          data: null,
        });
      });
    });
  });

  describe('updateProfile', () => {
    it('should update profile data successfully', async () => {
      const req = { user: { userId: 'user123' } } as any;
      const updateProfileDto: UpdateUserProfileDto = {
        displayName: 'User',
        gender: 'male',
        dateOfBirth: '01-08-1999',
        height: 175,
        weight: 80,
        interests: ['coding', 'gaming'],
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any as Response;

      const updatedProfile = {
        _id: 'profile123',
        password: 'hashedpassword',
        __v: 0,
        username: 'testuser',
        email: 'test@example.com',
        displayName: 'User',
        gender: 'male',
        dateOfBirth: '01-08-1999',
        height: 175,
        weight: 80,
        interests: ['coding', 'gaming'],
        toObject: jest.fn().mockReturnValue({
          displayName: 'User',
          gender: 'male',
          dateOfBirth: '01-08-1999',
          height: 175,
          weight: 80,
          interests: ['coding', 'gaming'],
        }),
      };

      (userService.updateProfile as jest.Mock).mockResolvedValue(
        updatedProfile,
      );

      await userController.updateProfile(req, updateProfileDto, res as any);

      expect(userService.updateProfile).toHaveBeenCalledWith(
        req.user.userId,
        updateProfileDto,
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Profile updated successfully',
        data: {
          displayName: 'User',
          gender: 'male',
          dateOfBirth: '01-08-1999',
          height: 175,
          weight: 80,
          interests: ['coding', 'gaming'],
        },
      });
    });

    it('should return error message on failure', async () => {
      const req = { user: { userId: 'user123' } } as any;
      const updateProfileDto: UpdateUserProfileDto = {
        displayName: 'User',
        gender: 'male',
        dateOfBirth: '01-08-1999',
        height: 175,
        weight: 80,
        interests: ['coding', 'gaming'],
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any as Response;

      const error = new Error('Failed to update profile');

      (userService.updateProfile as jest.Mock).mockRejectedValue(error);

      await userController.updateProfile(req, updateProfileDto, res as any);

      expect(userService.updateProfile).toHaveBeenCalledWith(
        req.user.userId,
        updateProfileDto,
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: error.message,
        data: null,
      });
    });
  });
});
