import { BadRequestException, Body, Controller, Patch } from '@nestjs/common';
import { AdminUserService } from '../../application/admin-user.service';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RolesEnum } from 'src/core/constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin/user')
@Roles(RolesEnum.ADMIN)
@Controller('admin/user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Patch('set-salary')
  public async setUserSalary(@Body() body: { userId: number; salary: number }) {
    if (!body.userId || !body.salary) {
      throw new BadRequestException();
    }
    return this.adminUserService.setUserSalary(body);
  }
}
