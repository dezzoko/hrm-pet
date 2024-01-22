import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestEntity } from '../entities';
import { BaseRepository } from 'src/core/interfaces/repository.interface';

export class TestRepository extends BaseRepository<TestEntity> {
  constructor(
    @InjectRepository(TestEntity)
    private testRepository: Repository<TestEntity>,
  ) {
    super(
      testRepository.target,
      testRepository.manager,
      testRepository.queryRunner,
    );
  }
}
