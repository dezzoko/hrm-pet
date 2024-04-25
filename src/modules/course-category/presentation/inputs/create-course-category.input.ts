import { IsString } from 'class-validator';

export class CreateCourseCategoryInput {
  @IsString()
  name: string;
}
