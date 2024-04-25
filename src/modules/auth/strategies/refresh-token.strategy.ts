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

  async validate(request: Request, payload: TokenPayload) {
    console.log('PAYLOAD', payload);

    const user = await this.userService.getUserIfRefreshTokenMatches(
      request.body?.refreshToken,
      payload.userId,
    );

    return user;
  }
}
