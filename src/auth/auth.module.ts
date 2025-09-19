import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerModule } from 'src/customer/customer.module';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [
    //forwardRef(() => AdminModule), 
    forwardRef(() => CustomerModule),
    forwardRef(() => TicketModule),  
    JwtModule.register({
      global: true,
      secret: '122ewfpeo2we12',
      signOptions: { expiresIn: '1h'},
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
