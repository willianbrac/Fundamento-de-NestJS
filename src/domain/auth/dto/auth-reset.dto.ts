import { IsNotEmpty, IsStrongPassword, IsJWT } from 'class-validator';

export class AuthResetDto {
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsJWT()
  jwt: string;
}
