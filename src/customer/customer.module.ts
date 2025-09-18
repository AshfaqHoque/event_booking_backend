// src/customer/customer.module.ts
import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { PrismaService } from 'prisma/prisma.service';
import { CustomerController } from './customer.controller';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService],
})
export class CustomerModule {}
