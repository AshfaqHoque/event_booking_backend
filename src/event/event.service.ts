import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Event as MyEvent } from '@prisma/client';
import { CreateEventDto } from './dto/create_event.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}


async create(createEventDto: CreateEventDto): Promise<{message: string; event:MyEvent}> {
    const newEvent = await this.prisma.event.create({ data: createEventDto });
    return {message:"Event Created Succesfully", event: newEvent};
  }

  findAll() {
    return this.prisma.event.findMany({ orderBy: { date: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.EventUpdateInput) {
    return this.prisma.event.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }
}
