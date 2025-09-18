import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { CustomerModule } from './customer/customer.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [EventModule, CustomerModule, TicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
