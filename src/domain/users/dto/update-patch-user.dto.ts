import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class UpdatePatchUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: string;
}
