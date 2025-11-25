// src/auth/auth.controller.ts
import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Request } from 'express';

// Tipo de usuario que viene DENTRO del token
interface JwtUser {
  userId: number;
  email: string;
  name: string;
}

// Extendemos Request para incluir req.user tipado
interface AuthRequest extends Request {
  user: JwtUser;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/register
  @Post('register')
  register(@Body() dto: RegisterDto): Promise<{ access_token: string }> {
    return this.authService.register(dto);
  }

  // POST /auth/login
  @Post('login')
  login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(dto);
  }

  // GET /auth/profile  (requiere JWT)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: AuthRequest): JwtUser {
    return req.user; // viene del payload del token
  }
}
