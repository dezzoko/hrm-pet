import { Module } from '@nestjs/common';
import { RoleController } from './presentation';
import { RoleService } from './application';
import { RoleDomain } from './domain';
import { RoleRepository, RoleEntity } from './infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleDomain, RoleRepository, RoleEntity],
  imports: [TypeOrmModule.forFeature([RoleEntity]), UserModule],
})
export class RoleModule {}
