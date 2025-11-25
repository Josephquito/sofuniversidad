// src/auth/auth.controller.ts
import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Request } from 'express';

// Tipo de usuario que manejamos en el JWT / respuestas
interface JwtUser {
  id: number;
  email: string;
  name: string;
}

// Request extendido para tener req.user tipado
interface AuthRequest extends Request {
  user: JwtUser;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body() dto: RegisterDto,
  ): Promise<{ user: JwtUser; access_token: string }> {
    return this.authService.register(dto);
  }

  @Post('login')
  login(
    @Body() dto: LoginDto,
  ): Promise<{ user: JwtUser; access_token: string }> {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: AuthRequest): JwtUser {
    return req.user;
  }
}
