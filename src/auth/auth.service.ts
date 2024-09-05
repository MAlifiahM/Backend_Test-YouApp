import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async register(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    const existingUser = await this.userModel.findOne({ username });

    if (existingUser) {
      throw new BadRequestException('user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username: username,
      password: hashedPassword,
      email: email,
    });
    return newUser.save();
  }

  async login(
    username: string,
    email: string,
    password: string,
  ): Promise<string> {
    const user = await this.userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user._id, username: user.username };
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
