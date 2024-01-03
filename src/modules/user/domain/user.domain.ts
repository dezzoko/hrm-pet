import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from '../infrastructure';
import { CreateUserParams } from '../application/user.service-params';
import * as usersMocks from '../mocks/users.json';
@Injectable()
export class UserDomain implements OnModuleInit {
  constructor(private readonly userRepository: UserRepository) {}
  onModuleInit() {
    usersMocks.map(async (item) => {
      const exists = await this.userRepository.exist({
        where: { email: item?.email },
      });

      if (!exists) {
        await this.userRepository.save(item);
      }
    });
  }

  async getUserById(userId: number) {
    return this.userRepository.findOneBy({ id: userId });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async setRefreshToken(userId: number, refreshToken: string) {
    await this.userRepository.update(
      { id: userId },
      {
        currentHashedRefreshToken: refreshToken,
      },
    );
  }

  async createUser(params: CreateUserParams) {
    const { email, name, surname, roleId, password } = params;
    const result = this.userRepository.create({
      email,
      name,
      password,
      surname,
      roles: [{ id: roleId }],
    });

    await this.userRepository.save(result);

    return result;
  }
}
