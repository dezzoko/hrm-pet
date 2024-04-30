import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import TokenPayload from '../../../core/interfaces/token-payload';
import { UserService } from 'src/modules/user';
import { Config } from 'src/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const { secretJwtRefresh } =
      configService.get<Config['application']>('application');
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: secretJwtRefresh,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TokenPayload) {
    const user = await this.userService.getUserIfRefreshTokenMatches(
      req.body.refreshToken,
      payload.userId,
    );

    return user;
  }
}
