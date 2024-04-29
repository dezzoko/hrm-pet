import { Injectable } from '@nestjs/common';
import { CourseDomain } from '../domain';

import {
  CreateCourseParams,
  GetCoursesParams,
  UpdateCourseParams,
} from '../domain/course.domain-type';
import { Pagination } from 'src/core/interfaces/pagination';

@Injectable()
export class CourseService {
  constructor(private readonly courseDomain: CourseDomain) {}

  public async getCourses(params: GetCoursesParams) {
    return this.courseDomain.getCourses(params);
  }

  public async getUnapprovedCourses(
    params: GetCoursesParams & {
      searchField: string;
      courseCategoryId?: number;
      approved: boolean;
    },
  ) {
    return this.courseDomain.getAllUnapprovedCourses(params);
  }

  public async approveCourse(courseId: number, approverId: number) {
    return this.courseDomain.approveCourse(courseId, approverId);
  }

  public async getCourseById(id: number) {
    return this.courseDomain.getCourseById(id);
  }

  public async updateCourse(params: UpdateCourseParams) {
    return this.courseDomain.updateCourse(params);
  }

  public async deleteCourse(id: number) {
    return this.courseDomain.deleteCourse(id);
  }

  public async createCourse(params: CreateCourseParams) {
    return this.courseDomain.createCourse(params);
  }

  public async getUserCourse(userId: number, pagination: Pagination) {
    return this.courseDomain.getUserCourse(userId, pagination);
  }
}
