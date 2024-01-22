import { EntityManager, EntityTarget, QueryRunner, Repository } from 'typeorm';
import { calculatePagination } from '../utils';

interface FindWithPaginationParams {
  page: number;
  limit: number;
}

interface FindWithPaginationResult<T> {
  totalPages: number;
  total: number;
  data: T[];
  page: number;
  limit: number;
}

export abstract class BaseRepository<T> extends Repository<T> {
  constructor(
    entity: EntityTarget<T>,
    manager: EntityManager,
    queryRunner?: QueryRunner,
  ) {
    super(entity, manager, queryRunner);
  }
  async findWithPagination(
    params: FindWithPaginationParams,
  ): Promise<FindWithPaginationResult<T>> {
    const { limit, page } = params;
    const { take, skip } = calculatePagination(limit, page);
    const [result, total] = await this.createQueryBuilder('entity')
      .where('')
      .skip(skip)
      .take(take)
      .getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return {
      data: result,
      totalPages,
      total,
      limit,
      page,
    };
  }
}
