import { Pagination } from 'src/core/interfaces/pagination';

export interface GetCourseCategoriesParams extends Pagination {}

export interface CreateCourseCategoryParams {}

export interface UpdateCourseCategoryParams
  extends Partial<CreateCourseCategoryParams> {
  id: number;
}
