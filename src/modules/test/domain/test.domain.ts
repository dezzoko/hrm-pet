import { Injectable } from '@nestjs/common';
import { TestRepository } from '../infrastructure';

import {
  CreateTestParams,
  GetTestsParams,
  UpdateTestParams,
} from './test.domain-type';

@Injectable()
export class TestDomain {
  constructor(private readonly testRepository: TestRepository) {}

  public async getTestById(id: number) {
    return this.testRepository.findBy({ id });
  }

  public async getTests(params: GetTestsParams): Promise<any> {
    return this.testRepository.findWithPagination(params);
  }

  public async updateTest(params: UpdateTestParams) {
    const updatedTest = await this.testRepository.update(
      { id: params.id },
      {
        ...params,
      },
    );
    return updatedTest;
  }

  public async deleteTest(id: number) {
    await this.testRepository.delete({ id });
  }

  public async createTest(params: CreateTestParams) {
    const createdTest = this.testRepository.create(params);
    await this.testRepository.save(createdTest);
    return createdTest;
  }
}
