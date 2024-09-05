import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserProfileDto {
  @ApiProperty({ description: 'displayName' })
  @IsOptional()
  @IsString()
  displayName: string;

  @ApiProperty({ description: 'gender', example: 'male' })
  @IsString()
  gender: string;

  @ApiProperty({ description: 'dateOfBirth', example: '01-01-1990' })
  @IsString()
  dateOfBirth: string;

  @ApiProperty({ description: 'height', example: '120' })
  @IsNumber()
  height: number;

  @ApiProperty({ description: 'weight', example: '60' })
  @IsNumber()
  weight: number;

  @ApiProperty({ description: 'horoscope' })
  @IsOptional()
  @IsString()
  readonly horoscope?: string;

  @ApiProperty({ description: 'zodiac' })
  @IsOptional()
  @IsString()
  readonly zodiac?: string;

  @ApiProperty({ description: 'interests', example: '["reading", "fishing"]' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly interests?: string[];
}
