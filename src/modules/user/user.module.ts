import { Module } from '@nestjs/common';
import { UserEntity, UserRepository } from './infrastructure';
import { UserDomain } from './domain/user.domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './application';
import { AdminUserController } from './presentation/controllers/admin-user.controller';
import { AdminUserService } from './application/admin-user.service';
import { AdminUserDomain } from './domain/admin-user.domain';
import { UserController } from './presentation/controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserRepository,
    UserDomain,
    AdminUserService,
    AdminUserDomain,
    UserService,
  ],
  exports: [UserService, UserRepository],
  controllers: [AdminUserController, UserController],
})
export class UserModule {}
