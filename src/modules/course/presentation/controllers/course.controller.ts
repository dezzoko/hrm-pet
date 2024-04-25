import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';

import { CourseService } from '../../application';
import { PaginationParams, RequestWithUser } from 'src/core';
import { CreateCourseInput, UpdateCourseInput } from '../inputs';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @HttpCode(HttpStatus.OK)
  @Get('my-courses')
  public async getUserCourses(
    @Req() reqWithUser: RequestWithUser,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<any> {
    if (isNaN(+page) || isNaN(+limit))
      throw new BadRequestException('Invalid query params');
    return this.courseService.getUserCourse(reqWithUser.user.id, {
      limit: +limit,
      page: +page,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getCourseById(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.getCourseById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  public async getCourses(@Query() query: PaginationParams): Promise<any> {
    return this.courseService.getCourses(query);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  public async createCourse(@Body() body: CreateCourseInput) {
    return this.courseService.createCourse(body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteCourseById(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.deleteCourse(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch('')
  public async updateCourse(@Body() body: UpdateCourseInput) {
    return this.courseService.updateCourse(body);
  }
}
