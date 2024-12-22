import { IsEmail, IsString, IsNotEmpty, MinLength, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(10,10)
  @Matches(/^\d{10}$/, { message: 'Phone number must consist of exactly 10 digits' })
  phone: string;

  @IsString()
  @MinLength(8)
  password: string;
}
