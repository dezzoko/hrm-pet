import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { NoJwtAuth } from 'src/core/decorators/no-auth.decorator';
import { AuthService } from '../../application/auth.service';
import { LocalAuthGuard, RequestWithUser } from 'src/core';

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
}
