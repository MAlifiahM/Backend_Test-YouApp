import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'username' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'email' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
