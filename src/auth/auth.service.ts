import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CustomerService } from 'src/customer/customer.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private customerService: CustomerService,
        private jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto, response: Response): Promise<{ message: string; id: number  }> {
        const user = await this.customerService.findByEmail(loginDto.email);
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const payload = { id: user.id, email: user.email };
        const token = await this.jwtService.signAsync(payload);
        
        this.setCookie(response, token);
        return { message: " login successful", id: user.id  };
    }

    private setCookie(response: Response, token: string) {
        response.cookie('auth-token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 1000,
            path: '/',
        });
    }

    async logout(response: Response): Promise<{ message: string }> {
        response.clearCookie('auth-token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        return { message: 'Logout successful' };
    }
}



