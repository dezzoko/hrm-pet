import { Module } from '@nestjs/common';
import { CourseCategoryController } from './presentation';
import { CourseCategoryService } from './application';
import { CourseCategoryDomain } from './domain';
import {
  CourseCategoryRepository,
  CourseCategoryEntity,
} from './infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CourseCategoryController],
  providers: [
    CourseCategoryService,
    CourseCategoryDomain,
    CourseCategoryRepository,
    CourseCategoryEntity,
  ],
  imports: [TypeOrmModule.forFeature([CourseCategoryEntity])],
})
export class CourseCategoryModule {}
