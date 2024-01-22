import { Pagination } from 'src/core/interfaces/pagination';

export interface GetTestsParams extends Pagination {}

export interface CreateTestParams {}

export interface UpdateTestParams extends Partial<CreateTestParams> {
  id: number;
}
