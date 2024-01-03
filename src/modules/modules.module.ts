import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter, JwtAuthGuard, RolesGuard } from 'src/core';
import { DepartmentModule } from './department';

@Module({
  exports: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  imports: [AuthModule, UserModule, DepartmentModule],
})
export class ModulesModule {}
