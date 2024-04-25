import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from '../entities';
import { BaseRepository } from 'src/core/interfaces/repository.interface';

export class CourseRepository extends BaseRepository<CourseEntity> {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
  ) {
    super(
      courseRepository.target,
      courseRepository.manager,
      courseRepository.queryRunner,
    );
  }
}
