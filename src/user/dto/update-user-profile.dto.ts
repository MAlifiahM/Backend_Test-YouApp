import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileDto {
  @ApiProperty({ example: 'John Doe', description: 'User display name' })
  @IsOptional()
  @IsString()
  displayName: string;

  @ApiProperty({ example: 'Male', description: 'User gender' })
  @IsString()
  gender: string;

  @ApiProperty({ example: '01-01-1990', description: 'User date of birth' })
  @IsString()
  dateOfBirth: string;

  @ApiProperty({ example: '120', description: 'User Height' })
  @IsNumber()
  height: number;

  @ApiProperty({ example: '80', description: 'User Weight' })
  @IsNumber()
  weight: number;

  @ApiProperty({ example: 'Aries', description: 'User Horoscope' })
  @IsOptional()
  @IsString()
  readonly horoscope?: string;

  @ApiProperty({ example: 'Rabbit', description: 'User zodiac' })
  @IsOptional()
  @IsString()
  readonly zodiac?: string;

  @ApiProperty({ example: '["Sports"]', description: 'User interests' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly interests?: string[];
}
