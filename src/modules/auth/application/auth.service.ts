import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { comparePassword } from 'src/core';
import { UserService } from 'src/modules/user';
import { GetUserJwtTokens, SetRefreshTokenParams } from './auth.service-type';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  private secretJwtAccess: string;
  private secretJwtRefresh: string;
  private accessExpiresIn: number;
  private refreshExpiresIn: number;
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    const {
      accessExpiresIn,
      refreshExpiresIn,
      secretJwtAccess,
      secretJwtRefresh,
    } = this.configService.get<Config['application']>('application');
    this.secretJwtAccess = secretJwtAccess;
    this.secretJwtRefresh = secretJwtRefresh;
    this.accessExpiresIn = 250 * 250 * 250 * 900000;
    this.refreshExpiresIn = refreshExpiresIn;
  }

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

    const refreshToken = this.jwtService.sign(
      { userId, roles },
      {
        secret: this.secretJwtRefresh,
        expiresIn: this.refreshExpiresIn,
      },
    );
    const accessToken = this.jwtService.sign(
      { userId, roles },
      { secret: this.secretJwtAccess, expiresIn: this.accessExpiresIn },
    );

    await this.userService.setRefreshToken(userId, refreshToken);
    return { refreshToken, accessToken, userId, roles };
  }

  async setCurrentRefreshToken(params: SetRefreshTokenParams) {
    const { roles, userId } = params;
    const refreshToken = this.jwtService.sign(
      { userId, roles },
      {
        secret: this.secretJwtRefresh,
        expiresIn: this.refreshExpiresIn,
      },
    );
    await this.userService.setRefreshToken(userId, refreshToken);
    return refreshToken;
  }
}
