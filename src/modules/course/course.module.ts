import { Module } from '@nestjs/common';
import { CourseController } from './presentation';
import { CourseService } from './application';
import { CourseDomain } from './domain';
import { CourseRepository, CourseEntity } from './infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';

@Module({
  controllers: [CourseController],
  providers: [CourseService, CourseDomain, CourseRepository, CourseEntity],
  imports: [TypeOrmModule.forFeature([CourseEntity]), UserModule],
})
export class CourseModule {}
