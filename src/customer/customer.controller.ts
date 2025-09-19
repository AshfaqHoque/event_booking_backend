// src/customer/customer.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from '@prisma/client';
import { CreateCustomerDto } from './dto/create_customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

    @Post('create')
    create(@Body()createCustomerDto:CreateCustomerDto) {
        return this.customerService.create(createCustomerDto);
    }

  @Get()
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Customer | null> {
    return this.customerService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: { name?: string; email?: string; password?: string }
  ): Promise<Customer> {
    return this.customerService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Customer> {
    return this.customerService.remove(+id);
  }
}
