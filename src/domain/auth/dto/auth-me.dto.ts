import { IsNotEmpty, IsJWT } from 'class-validator';

export class AuthMeDto {
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
