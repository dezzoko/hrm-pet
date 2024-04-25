import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { NoJwtAuth } from 'src/core/decorators/no-auth.decorator';
import { AuthService } from '../../application/auth.service';
import { LocalAuthGuard, RequestWithUser } from 'src/core';
import JwtRefreshGuard from 'src/core/guards/jwt-refresh.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @NoJwtAuth()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() requestWithUser: RequestWithUser) {
    const { roles, id: userId } = requestWithUser.user;
    return this.authService.getUserJwtTokens({ userId, roles });
  }

  @UseGuards(JwtRefreshGuard)
  @Post('grant-tokens')
  async grantNewTokens(@Req() requestWithUser: RequestWithUser) {
    const { user } = requestWithUser;
    return this.authService.getUserJwtTokens({
      roles: user.roles,
      userId: user.id,
    });
  }
}
