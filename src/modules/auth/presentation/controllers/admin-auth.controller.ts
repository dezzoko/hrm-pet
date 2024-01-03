import { Post, Body, Controller, UseGuards } from '@nestjs/common';
import { AdminAuthService } from '../../application/admin-auth.service';
import { SignUpInput } from '../inputs';
import { Roles } from 'src/core/decorators/roles.decorator';
import { ADMIN_ROLE } from 'src/core/constants';
import { JwtAuthGuard, RolesGuard } from 'src/core';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Body() body: SignUpInput) {
    return this.authService.signUp(body);
  }
}
