import { Injectable } from '@nestjs/common';
import { Prisma, Ticket } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.TicketCreateInput): Promise<Ticket> {
    return this.prisma.ticket.create({ data });
  }

  findAll(): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      include: { customer: true, event: true },
    });
  }

  findOne(id: number): Promise<Ticket | null> {
    return this.prisma.ticket.findUnique({
      where: { id },
      include: { customer: true, event: true },
    });
  }

  findByCustomer(customerId: number): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: { customerId },
      include: { event: true },
    });
  }

  update(id: number, data: Prisma.TicketUpdateInput): Promise<Ticket> {
    return this.prisma.ticket.update({ where: { id }, data });
  }

  remove(id: number): Promise<Ticket> {
    return this.prisma.ticket.delete({ where: { id } });
  }
}
