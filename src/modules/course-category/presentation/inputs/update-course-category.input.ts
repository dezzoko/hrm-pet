import { PartialType } from '@nestjs/swagger';
import { CreateCourseCategoryInput } from './create-course-category.input';
import { IsNumber } from 'class-validator';

export class UpdateCourseCategoryInput extends PartialType(
  CreateCourseCategoryInput,
) {
  @IsNumber()
  id: number;
}
