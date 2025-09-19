import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { CustomerModule } from './customer/customer.module';
import { TicketModule } from './ticket/ticket.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EventModule, CustomerModule, TicketModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
