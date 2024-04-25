import { PartialType } from '@nestjs/swagger';
import { CreateCourseInput } from './create-course.input';
import { IsNumber } from 'class-validator';

export class UpdateCourseInput extends PartialType(CreateCourseInput) {
  @IsNumber()
  id: number;
}
