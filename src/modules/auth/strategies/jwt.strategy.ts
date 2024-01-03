import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Config } from 'src/config';
import { UserService } from 'src/modules/user';
import TokenPayload from '../../../core/interfaces/token-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const { secretJwtAccess } =
      configService.get<Config['application']>('application');

    super({
      secretOrKey: secretJwtAccess,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: TokenPayload) {
    const user = await this.userService.getUserById(payload.userId);
    if (!user) throw new UnauthorizedException('');
    return { userId: payload.userId, roles: payload.roles };
  }
}
