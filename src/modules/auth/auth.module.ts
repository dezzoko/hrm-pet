import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { UserModule } from '../user';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies';
import { JwtRefreshStrategy } from './strategies/refresh-token.strategy';
import { AdminAuthController } from './presentation/controllers/admin-auth.controller';
import { AdminAuthService } from './application/admin-auth.service';
import { RolesGuard } from 'src/core';
import { AuthController } from './presentation/controllers';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, JwtModule.register({ global: true })],
  controllers: [AdminAuthController, AuthController],
  providers: [
    AuthService,
    AdminAuthService,
    LocalStrategy,
    RolesGuard,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
