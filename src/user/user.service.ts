import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { determineZodiac } from '../common/zodiac.util';
import { determineHoroscope } from '../common/horoscope.util';
import { isValidDate, parseDateString } from '../common/date.util';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createProfile(
    userId: string,
    createProfileDto: CreateUserProfileDto,
  ): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const dateString = createProfileDto.dateOfBirth;
    if (!isValidDate(dateString)) {
      throw new BadRequestException('dateOfBirth must be in DD-MM-YYYY format');
    }

    const birthDate = parseDateString(dateString);

    const zodiac = determineZodiac(birthDate);

    const horoscope = determineHoroscope(birthDate);

    Object.assign(user, createProfileDto, {
      dateOfBirth: birthDate,
      zodiac,
      horoscope,
    });
    return user.save();
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateUserProfileDto,
  ): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const dateString = updateProfileDto.dateOfBirth;
    if (!isValidDate(dateString)) {
      throw new BadRequestException('dateOfBirth must be in DD-MM-YYYY format');
    }

    const birthDate = parseDateString(dateString);

    const zodiac = determineZodiac(birthDate);

    const horoscope = determineHoroscope(birthDate);

    Object.assign(user, updateProfileDto, {
      dateOfBirth: birthDate,
      zodiac,
      horoscope,
    });
    return user.save();
  }
}
