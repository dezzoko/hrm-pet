import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseCategoryEntity } from '../entities';
import { BaseRepository } from 'src/core/interfaces/repository.interface';

export class CourseCategoryRepository extends BaseRepository<CourseCategoryEntity> {
  constructor(
    @InjectRepository(CourseCategoryEntity)
    private courseCategoryRepository: Repository<CourseCategoryEntity>,
  ) {
    super(
      courseCategoryRepository.target,
      courseCategoryRepository.manager,
      courseCategoryRepository.queryRunner,
    );
  }
}
