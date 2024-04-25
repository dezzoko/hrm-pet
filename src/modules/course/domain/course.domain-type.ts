import { Pagination } from 'src/core/interfaces/pagination';

export interface GetCoursesParams extends Pagination {}

export interface CreateCourseParams {
  name: string;
  description?: string;
  userId: number;
  additionalInfoUrl: string;
  courseCategoryId: number;
}

export interface UpdateCourseParams extends Partial<CreateCourseParams> {
  id: number;
}
