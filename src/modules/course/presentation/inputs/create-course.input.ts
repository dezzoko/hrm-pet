import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCourseInput {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  userId: number;

  @IsString()
  additionalInfoUrl: string;

  @IsNumber()
  courseCategoryId: number;
}
