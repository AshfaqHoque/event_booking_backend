import { ConflictException, Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCustomerDto } from './dto/create_customer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

async create(createCustomerDto: CreateCustomerDto): Promise<{ message: string; customer: Partial<Customer>}> {
    const existingCustomer = await this.prisma.customer.findUnique({
        where: { email: createCustomerDto.email }
    });
    if (existingCustomer) throw new ConflictException('Customer with this email already exists');
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createCustomerDto.password, salt);
    const newCustomer = await this.prisma.customer.create({
        data: {
            ...createCustomerDto,
            password: hashedPassword
        }
    });
    const { password, ...customerWithoutPassword } = newCustomer;
    
    return { 
        message: 'Customer created successfully', 
        customer: customerWithoutPassword 
    };
}

  findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  findOne(id: number): Promise<Customer | null> {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({ where: { email } });
  }

  update(id: number, data: Prisma.CustomerUpdateInput): Promise<Customer> {
    return this.prisma.customer.update({ where: { id }, data });
  }

  remove(id: number): Promise<Customer> {
    return this.prisma.customer.delete({ where: { id } });
  }
}
