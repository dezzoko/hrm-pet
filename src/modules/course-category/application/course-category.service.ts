import { Injectable } from '@nestjs/common';
import { CourseCategoryDomain } from '../domain';

import {
  CreateCourseCategoryParams,
  GetCourseCategoriesParams,
  UpdateCourseCategoryParams,
} from '../domain/course-category.domain-type';
@Injectable()
export class CourseCategoryService {
  constructor(private readonly courseCategoryDomain: CourseCategoryDomain) {}

  public async getCourseCategories(params: GetCourseCategoriesParams) {
    return this.courseCategoryDomain.getCourseCategories(params);
  }

  public async getCourseCategoryById(id: number) {
    return this.courseCategoryDomain.getCourseCategoryById(id);
  }

  public async updateCourseCategory(params: UpdateCourseCategoryParams) {
    return this.courseCategoryDomain.updateCourseCategory(params);
  }

  public async deleteCourseCategory(id: number) {
    return this.courseCategoryDomain.deleteCourseCategory(id);
  }

  public async createCourseCategory(params: CreateCourseCategoryParams) {
    return this.courseCategoryDomain.createCourseCategory(params);
  }
}
