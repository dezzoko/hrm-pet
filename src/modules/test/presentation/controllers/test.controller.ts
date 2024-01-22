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

import { TestService } from '../../application';
import { PaginationParams } from 'src/core';
import { CreateTestInput, UpdateTestInput } from '../inputs';

@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getTestById(@Param('id', ParseIntPipe) id: number) {
    return this.testService.getTestById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  public async getTests(@Query() query: PaginationParams): Promise<any> {
    return this.testService.getTests(query);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('')
  public async createTest(@Body() body: CreateTestInput) {
    return this.testService.createTest(body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteTestById(@Param('id', ParseIntPipe) id: number) {
    return this.testService.deleteTest(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch('')
  public async updateTest(@Body() body: UpdateTestInput) {
    return this.testService.updateTest(body);
  }
}
