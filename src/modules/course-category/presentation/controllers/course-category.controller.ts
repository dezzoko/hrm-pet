import {
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
} from '@nestjs/common';

import { CourseCategoryService } from '../../application';
import { PaginationParams } from 'src/core';
import {
  CreateCourseCategoryInput,
  UpdateCourseCategoryInput,
} from '../inputs';

@Controller('course-category')
export class CourseCategoryController {
  constructor(private readonly courseCategoryService: CourseCategoryService) {}

  @Get('search')
  public async searchCourseCategory(
    @Query('search-field') searchField: string,
  ) {
    return this.courseCategoryService.searchCourseCategory(searchField);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getCourseCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.courseCategoryService.getCourseCategoryById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  public async getCourseCategories(
    @Query() query: PaginationParams,
  ): Promise<any> {
    return this.courseCategoryService.getCourseCategories(query);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  public async createCourseCategory(@Body() body: CreateCourseCategoryInput) {
    return this.courseCategoryService.createCourseCategory(body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteCourseCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.courseCategoryService.deleteCourseCategory(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch('')
  public async updateCourseCategory(@Body() body: UpdateCourseCategoryInput) {
    return this.courseCategoryService.updateCourseCategory(body);
  }
}
