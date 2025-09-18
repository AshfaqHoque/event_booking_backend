import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Ticket } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { BookTicketDto } from './dto/book_ticket.dto';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async bookTicket(dto: BookTicketDto): Promise<Ticket> {
    const { customerId, eventId, quantity } = dto;

    const event = await this.prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');

    if (event.availableSeats < quantity) {
      throw new BadRequestException('Not enough available seats');
    }

    await this.prisma.event.update({
      where: { id: eventId },
      data: { availableSeats: event.availableSeats - quantity },
    });

    const totalPrice = event.price * quantity;

    const ticket = await this.prisma.ticket.create({
      data: {
        customerId,
        eventId,
        quantity,
        totalPrice,
      },
      include: { event: true, customer: true },
    });

    return ticket;
  }
  
  async getTicketsByCustomer(customerId: number) {
    return this.prisma.ticket.findMany({
        where: { customerId },
        include: {
        event: true,      // include event details
        customer: true,   // optional: include customer info
        },
        orderBy: {
        createdAt: 'desc', // newest bookings first
        },
    });
    }


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
