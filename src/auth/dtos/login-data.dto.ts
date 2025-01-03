import { IsEmail, IsString, IsNotEmpty, MinLength, Length, Matches } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
