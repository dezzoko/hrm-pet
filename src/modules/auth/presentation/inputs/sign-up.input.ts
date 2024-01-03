import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/core/decorators/match.decorator';
export class SignUpInput {
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  surname: string;

  @IsEmail()
  @MinLength(5)
  email: string;

  @MinLength(8)
  @MaxLength(30)
  // @IsStrongPassword()
  password: string;

  @MinLength(8)
  @MaxLength(30)
  @Match('password')
  confirmPassword: string;

  @IsNumber()
  roleId: number;
}
