import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Prisma } from '@prisma/client';
import { BookTicketDto } from './dto/book_ticket.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(AuthGuard)
  @Post('book')
  async bookTicket(@Body() dto: BookTicketDto) {
    return this.ticketService.bookTicket(dto);
  }

  @Post()
  create(@Body() data: Prisma.TicketCreateInput) {
    return this.ticketService.create(data);
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @Get('customer/:customerId')
  findByCustomer(@Param('customerId') customerId: string) {
    return this.ticketService.findByCustomer(+customerId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.TicketUpdateInput) {
    return this.ticketService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
