import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseEntity, CourseRepository } from '../infrastructure';

import {
  CreateCourseParams,
  GetCoursesParams,
  UpdateCourseParams,
} from './course.domain-type';
import { FindWithPaginationResult } from 'src/core/interfaces/repository.interface';
import { Pagination } from 'src/core/interfaces/pagination';

@Injectable()
export class CourseDomain {
  constructor(private readonly courseRepository: CourseRepository) {}

  public async getCourseById(id: number) {
    return this.courseRepository.findOne({
      where: { id },
      relations: ['user', 'courseCategory'],
      select: {
        user: {
          name: true,
        },
        courseCategory: {
          id: true,
          name: true,
        },
      },
    });
  }

  public async getUserCourse(
    userId: number,
    pagination: Pagination,
  ): Promise<FindWithPaginationResult<CourseEntity> | any> {
    return this.courseRepository.findWithPagination({
      ...pagination,
      where: { user: { id: userId } },
      relations: ['courseCategory'],
      order: { updated_at: 'DESC' },
      select: {
        courseCategory: {
          id: true,
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

  public async getAllUnapprovedCourses(
    params: Pagination & {
      searchField: string;
      orderBy?: string;
      order?: 'ASC' | 'DESC';
      filter?: 'approved' | 'unapproved';
    },
  ) {
    const { limit, page, searchField } = params;
    const findCourseBuilder =
      this.courseRepository.createQueryBuilder('course');

    findCourseBuilder.where('course.isApproved = :isApproved', {
      isApproved: true,
    });

    if (searchField) {
      findCourseBuilder.andWhere(
        '(course.name LIKE :searchField OR course.description LIKE :searchField)',
        { searchField: `%${searchField}%` },
      );
    }

    findCourseBuilder.leftJoinAndSelect('course.user', 'user');

    if (searchField) {
      findCourseBuilder.orWhere(
        '(user.name LIKE :searchField OR user.surname LIKE :searchField)',
        { searchField: `%${searchField}%` },
      );
    }

    findCourseBuilder.skip((page - 1) * limit).take(limit);
    findCourseBuilder.orderBy('course.created_at', 'DESC');

    const [courses, total] = await findCourseBuilder.getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    return { data: courses, total, totalPages, page, limit };
  }

  public async approveCourse(courseId: number, approvedUserId: number) {
    const updatedCourse = await this.courseRepository.update(
      { id: courseId },
      {
        isApproved: true,
        approvedAt: new Date(),
        approvedBy: {
          id: approvedUserId,
        },
      },
    );

    if (!updatedCourse.affected) {
      throw new NotFoundException('Course not found');
    }

    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['approvedBy'],
    });
    return course;
  }
}
