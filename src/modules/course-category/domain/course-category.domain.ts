import { Injectable } from '@nestjs/common';
import { CourseCategoryRepository } from '../infrastructure';

import {
  CreateCourseCategoryParams,
  GetCourseCategoriesParams,
  UpdateCourseCategoryParams,
} from './course-category.domain-type';

@Injectable()
export class CourseCategoryDomain {
  constructor(
    private readonly courseCategoryRepository: CourseCategoryRepository,
  ) {}

  public async getCourseCategoryById(id: number) {
    return this.courseCategoryRepository.findBy({ id });
  }

  public async getCourseCategories(
    params: GetCourseCategoriesParams,
  ): Promise<any> {
    return this.courseCategoryRepository.findWithPagination(params);
  }

  public async updateCourseCategory(params: UpdateCourseCategoryParams) {
    const updatedCourseCategory = await this.courseCategoryRepository.update(
      { id: params.id },
      {
        ...params,
      },
    );
    return updatedCourseCategory;
  }

  public async deleteCourseCategory(id: number) {
    await this.courseCategoryRepository.delete({ id });
  }

  public async createCourseCategory(params: CreateCourseCategoryParams) {
    const createdCourseCategory = this.courseCategoryRepository.create(params);
    await this.courseCategoryRepository.save(createdCourseCategory);
    return createdCourseCategory;
  }
}
