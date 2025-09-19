import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { Prisma } from '@prisma/client';
import { CreateEventDto } from './dto/create_event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('create')
  create(@Body() dto:CreateEventDto) {
    return this.eventService.create(dto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.EventUpdateInput) {
    return this.eventService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
