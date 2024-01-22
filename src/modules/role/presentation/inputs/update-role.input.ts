import { PartialType } from '@nestjs/swagger';
import { CreateRoleInput } from './create-role.input';
import { IsNumber } from 'class-validator';

export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @IsNumber()
  id: number;
}
