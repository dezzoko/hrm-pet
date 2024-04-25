import { Controller, Get, Param, ParseIntPipe, Req } from '@nestjs/common';
import { UserService } from '../../application';
import { RequestWithUser } from 'src/core';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  public async getMyProfile(@Req() req: RequestWithUser) {
    return this.userService.getUserByIdWithRoles(req.user.id);
  }

  @Get(':id')
  public async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserByIdWithRoles(id);
  }
}
