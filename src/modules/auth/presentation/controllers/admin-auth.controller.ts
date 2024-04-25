import { Post, Body, Controller, UseGuards } from '@nestjs/common';
import { AdminAuthService } from '../../application/admin-auth.service';
import { SignUpInput } from '../inputs';
import { Roles } from 'src/core/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/core';
import { RolesEnum } from 'src/core/constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin/auth')
@Roles(RolesEnum.ADMIN)
@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Body() body: SignUpInput) {
    return this.authService.signUp(body);
  }
}
