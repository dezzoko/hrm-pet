import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/core';
import { UserService } from 'src/modules/user';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class AdminAuthService {
  constructor(private readonly userService: UserService) {}

  public async signUp(signUpDto) {
    const hashedPassword = await hashPassword(signUpDto.password);

    delete signUpDto.confirmPassword;
    try {
      await this.userService.createUser({
        ...signUpDto,
        password: hashedPassword,
      });

      return HttpStatus.NO_CONTENT;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError.code === '23505'
      ) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        `Something went wrong ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
