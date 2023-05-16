import { IsNotEmpty, IsEmail } from 'class-validator';

export class AuthForgetDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
