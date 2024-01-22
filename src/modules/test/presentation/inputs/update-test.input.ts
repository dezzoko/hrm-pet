import { PartialType } from '@nestjs/swagger';
import { CreateTestInput } from './create-test.input';
import { IsNumber } from 'class-validator';

export class UpdateTestInput extends PartialType(CreateTestInput) {
  @IsNumber()
  id: number;
}
