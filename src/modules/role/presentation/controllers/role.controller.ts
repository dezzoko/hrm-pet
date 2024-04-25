import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RoleService } from '../../application';
import { PaginationParams } from 'src/core';
import {
  AssignUserToRoleInput,
  CreateRoleInput,
  UpdateRoleInput,
} from '../inputs';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RolesEnum } from 'src/core/constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getRoleById(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.getRoleById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  public async getRoles(@Query() query: PaginationParams): Promise<any> {
    return this.roleService.getRoles(query);
  }

  @Roles(RolesEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  public async createRole(@Body() body: CreateRoleInput) {
    return this.roleService.createRole(body);
  }

  @Roles(RolesEnum.MODERATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteRoleById(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.deleteRole(id);
  }

  @Roles(RolesEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Patch('')
  public async updateRole(@Body() body: UpdateRoleInput) {
    return this.roleService.updateRole(body);
  }

  @Roles(RolesEnum.ADMIN)
  @HttpCode(201)
  @Post('assign-user-to-role')
  public async assignUserToRole(@Body() body: AssignUserToRoleInput) {
    return this.roleService.assignUserToRole(body);
  }
}
