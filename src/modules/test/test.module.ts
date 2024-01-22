import { Module } from '@nestjs/common';
import { TestController } from './presentation';
import { TestService } from './application';
import { TestDomain } from './domain';
import { TestRepository, TestEntity } from './infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TestController],
  providers: [TestService, TestDomain, TestRepository, TestEntity],
  imports: [TypeOrmModule.forFeature([TestEntity])],
})
export class TestModule {}
