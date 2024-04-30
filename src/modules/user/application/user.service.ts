import { Injectable } from '@nestjs/common';
import { CreateUserParams } from './user.service-params';
import { UserDomain } from '../domain';

@Injectable()
export class UserService {
  constructor(private readonly userDomain: UserDomain) {}

  async getUserById(userId: number) {
    return this.userDomain.getUserById(userId);
  }

  async getUserByIdWithRoles(userId: number) {
    return this.userDomain.getUserByIdWithRoles(userId);
  }

  async getUserByEmail(email: string) {
    return this.userDomain.getUserByEmail(email);
  }
  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.userDomain.getUserByIdWithRoles(userId);

    if (user.currentHashedRefreshToken === refreshToken) {
      return user;
    }
  }

  async createUser(params: CreateUserParams) {
    return this.userDomain.createUser(params);
  }
  async setRefreshToken(userId: number, refreshToken: string) {
    return this.userDomain.setRefreshToken(userId, refreshToken);
  }
}
