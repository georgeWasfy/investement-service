import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'john@example.com', description: 'Email' })
  @IsEmail({}, { message: 'This is not a valid email.' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class SignUpDto {
  @ApiProperty({ example: 'John Doe', description: 'Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email' })
  @IsEmail({}, { message: 'This is not a valid email.' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class TokensDto {
  @ApiProperty({ example: 'accessTokenValue', description: 'Access Token' })
  @IsString()
  access_token: string;

  @ApiProperty({ example: 'refreshTokenValue', description: 'Refresh Token' })
  @IsString()
  refresh_token: string;
}
