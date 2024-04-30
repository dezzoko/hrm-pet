import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { PaginationParams, RequestWithUser } from 'src/core';
import { RolesEnum } from 'src/core/constants';
import { Roles } from 'src/core/decorators/roles.decorator';
import { CourseService } from '../../application';

@Roles(RolesEnum.TEACHER)
@Controller('teacher/course')
export class TeacherCourseController {
  public constructor(private readonly courseService: CourseService) {}
  @Get('user-courses/:id')
  public async getUserCourses(
    @Param('id', ParseIntPipe) id: number,
    @Query() pagination: PaginationParams,
  ) {
    return { id, pagination };
  }

  @Get('')
  public async getCourses(
    @Query() pagination: PaginationParams,
    @Query('search-field') searchField: string,
    @Query('approved') approved: string,
    @Query('course-category-id') courseCategoryId?: string,
  ) {
    return this.courseService.getUnapprovedCourses({
      ...pagination,
      courseCategoryId: courseCategoryId ? +courseCategoryId : undefined,
      approved: approved === 'true',
      searchField,
    });
  }

  @Patch('approve/:id')
  public async approveCourse(
    @Param('id', ParseIntPipe) id: number,
    @Req() reqWithUser: RequestWithUser,
  ) {
    return this.courseService.approveCourse(id, reqWithUser.user.id);
  }
}
