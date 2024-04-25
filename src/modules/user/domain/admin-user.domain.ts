import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infrastructure';

@Injectable()
export class AdminUserDomain {
  constructor(private readonly userRepository: UserRepository) {}

  async setSalary(params) {
    const { userId, salary } = params;

    const user = await this.userRepository.findOneByOrFail({ id: userId });

    user.salary = salary;
    await this.userRepository.save(user);
    return user;
  }
}
