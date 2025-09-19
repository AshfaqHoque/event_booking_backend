import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import type { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/customer/login')
    async loginCustomer(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.login(loginDto, res);
    }

    @Post('/logout')
    @UseGuards(AuthGuard)
    async logoutAdmin(@Res({ passthrough: true }) res: Response) {
        return this.authService.logout(res);
    }

}
