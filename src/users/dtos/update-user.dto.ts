import { IsEmail, IsString, MinLength, Length, Matches, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @Length(10,10)
  @Matches(/^\d{10}$/, { message: 'Phone number must consist of exactly 10 digits' })
  phone: string;
}
