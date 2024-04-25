import { Injectable } from '@nestjs/common';
import { CourseEntity, CourseRepository } from '../infrastructure';

import {
  CreateCourseParams,
  GetCoursesParams,
  UpdateCourseParams,
} from './course.domain-type';
import { UserRepository } from 'src/modules/user';
import { FindWithPaginationResult } from 'src/core/interfaces/repository.interface';
import { Pagination } from 'src/core/interfaces/pagination';

@Injectable()
export class CourseDomain {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async getCourseById(id: number) {
    return this.courseRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        user: {
          name: true,
        },
      },
    });
  }

  public async getUserCourse(
    userId: number,
    pagination: Pagination,
  ): Promise<FindWithPaginationResult<CourseEntity> | any> {
    // return this.courseRepository.find({
    //   where: { user: { id: userId } },
    // });
    return this.courseRepository.findWithPagination({
      ...pagination,
      where: { user: { id: userId } },
      relations: ['courseCategory'],
      select: {
        courseCategory: {
          name: true,
        },
      },
    });
  }

  public async getCourses(params: GetCoursesParams): Promise<any> {
    return this.courseRepository.findWithPagination(params);
  }

  public async updateCourse(params: UpdateCourseParams) {
    const updatedCourse = await this.courseRepository.update(
      { id: params.id },
      {
        ...params,
      },
    );
    return updatedCourse;
  }

  public async deleteCourse(id: number) {
    await this.courseRepository.delete({ id });
  }

  public async createCourse(params: CreateCourseParams) {
    // const user = await this.userRepository.findOne({
    //   where: { id: params.userId },
    // });
    // console.log(user);

    const createdCourse = this.courseRepository.create({
      ...params,
      user: {
        id: params.userId,
      },
      courseCategory: {
        id: params.courseCategoryId,
      },
    });

    await this.courseRepository.save(createdCourse);

    const course = await this.courseRepository.findOne({
      where: { id: createdCourse.id },
      relations: ['courseCategory'],
    });
    return { ...course, courseCategory: course.courseCategory.name };
  }
}
