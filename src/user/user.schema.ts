import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, default: '' })
  displayName: string;

  @Prop({ required: false, default: '' })
  gender: string;

  @Prop({ required: false, default: 'DD-MM-YYYY' })
  dateOfBirth: Date;

  @Prop({ required: false, default: 0 })
  height: number;

  @Prop({ required: false, default: 0 })
  weight: number;

  @Prop({ type: String, required: false, default: '' })
  horoscope?: string;

  @Prop({ type: String, required: false, default: '' })
  zodiac?: string;

  @Prop({ type: [String], default: [] })
  interests?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
