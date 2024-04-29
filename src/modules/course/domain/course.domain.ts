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
      relations: ['user', 'courseCategory', 'approvedBy'],
      select: {
        user: {
          name: true,
        },
        courseCategory: {
          id: true,
          name: true,
        },
        approvedBy: {
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
      courseCategoryId?: number;
      order?: 'ASC' | 'DESC';
      approved?: boolean;
    },
  ) {
    const { limit, page, searchField, approved, courseCategoryId } = params;
    const findCourseBuilder =
      this.courseRepository.createQueryBuilder('course');

    findCourseBuilder.where('course.isApproved = :isApproved', {
      isApproved: approved,
    });

    if (searchField) {
      findCourseBuilder.andWhere(
        '(LOWER(course.name) LIKE LOWER(:searchField) OR LOWER(course.description) LIKE LOWER(:searchField))',
        { searchField: `%${searchField.toLowerCase()}%` },
      );
    }

    findCourseBuilder.leftJoinAndSelect('course.user', 'user');

    findCourseBuilder.leftJoinAndSelect(
      'course.courseCategory',
      'courseCategory',
    );
    if (searchField) {
      findCourseBuilder.orWhere(
        '(user.name LIKE :searchField OR user.surname LIKE :searchField)',
        { searchField: `%${searchField}%` },
      );
    }
    console.log(courseCategoryId);

    if (courseCategoryId) {
      findCourseBuilder.andWhere('courseCategory.id = :courseCategoryId', {
        courseCategoryId,
      });
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
