import { IsNumber } from 'class-validator';

export class AssignUserToRoleInput {
  @IsNumber()
  userId: number;

  @IsNumber()
  roleId: number;
}
