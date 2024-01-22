import { Injectable } from '@nestjs/common';
import { TestDomain } from '../domain';

import {
  CreateTestParams,
  GetTestsParams,
  UpdateTestParams,
} from '../domain/test.domain-type';

@Injectable()
export class TestService {
  constructor(private readonly testDomain: TestDomain) {}

  public async getTests(params: GetTestsParams) {
    return this.testDomain.getTests(params);
  }

  public async getTestById(id: number) {
    return this.testDomain.getTestById(id);
  }

  public async updateTest(params: UpdateTestParams) {
    return this.testDomain.updateTest(params);
  }

  public async deleteTest(id: number) {
    return this.testDomain.deleteTest(id);
  }

  public async createTest(params: CreateTestParams) {
    return this.testDomain.createTest(params);
  }
}
