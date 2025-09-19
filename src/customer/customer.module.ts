// src/customer/customer.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { PrismaService } from 'prisma/prisma.service';
import { CustomerController } from './customer.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService],
  exports: [CustomerService],
})
export class CustomerModule {}
