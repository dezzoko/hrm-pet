import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { comparePassword } from 'src/core';
import { UserService } from 'src/modules/user';
import { GetUserJwtTokens } from './auth.service-type';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      this.verifyPassword(plainTextPassword, user.password);
      return {
        id: user.id,
        roles: user.roles?.map((item) => item.roleName),
      };
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  private verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = comparePassword(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserJwtTokens(params: GetUserJwtTokens) {
    const { roles, userId } = params;

    const {
      secretJwtAccess,
      secretJwtRefresh,
      accessExpiresIn,
      refreshExpiresIn,
    } = this.configService.get<Config['application']>('application');
    const refreshToken = this.jwtService.sign(
      { userId, roles },
      {
        secret: secretJwtRefresh,
        expiresIn: refreshExpiresIn,
      },
    );
    const accessToken = this.jwtService.sign(
      { userId, roles },
      { secret: secretJwtAccess, expiresIn: accessExpiresIn },
    );

    await this.userService.setRefreshToken(userId, refreshToken);
    return { refreshToken, accessToken };
  }

  async setCurrentRefreshToken() {}
}
