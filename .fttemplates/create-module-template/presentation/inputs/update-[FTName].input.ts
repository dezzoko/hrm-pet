import { PartialType } from '@nestjs/swagger';
import { Create<FTName | Capitalize>Input } from './create-<FTName>.input';
import { IsNumber } from 'class-validator';

export class Update<FTName | Capitalize>Input extends PartialType(Create<FTName | Capitalize>Input) {
  @IsNumber()
  id: number;
}
