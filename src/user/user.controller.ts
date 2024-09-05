import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('createProfile')
  @ApiOperation({ summary: 'Create user profile' })
  @ApiResponse({ status: 201, description: 'Profile created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createProfile(
    @Request() req,
    @Body() createProfileDto: CreateUserProfileDto,
    @Res() res: Response,
  ) {
    const user = req.user;
    return this.userService
      .createProfile(user.userId, createProfileDto)
      .then((profile) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, password, __v, username, email, ...profileData } =
          profile.toObject();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        res.status(201).json({
          message: 'Profile created successfully',
          data: profileData,
        });
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        res.status(400).json({
          message: error.message,
          data: null,
        });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getProfile(@Request() req, @Res() res: Response) {
    const user = req.user;
    return this.userService
      .getProfile(user.userId)
      .then((profile) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, password, __v, username, email, ...profileData } =
          profile.toObject();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        res.status(200).json({
          message: 'Profile retrieved successfully',
          data: profileData,
        });
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        res.status(400).json({
          message: error.message,
          data: null,
        });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateProfile')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateUserProfileDto,
    @Res() res: Response,
  ) {
    const user = req.user;
    return this.userService
      .updateProfile(user.userId, updateProfileDto)
      .then((profile) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, password, __v, username, email, ...profileData } =
          profile.toObject();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        res.status(200).json({
          message: 'Profile updated successfully',
          data: profileData,
        });
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        res.status(400).json({
          message: error.message,
          data: null,
        });
      });
  }
}
