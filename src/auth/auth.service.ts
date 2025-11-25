// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

// Tipo del usuario interno en memoria
interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Base de datos en memoria (solo para pruebas)
  private users: User[] = [
    {
      id: 1,
      email: 'test@example.com',
      name: 'Usuario Demo',
      password: '123456',
    },
  ];

  // Método interno para buscar por email
  private findByEmail(email: string): User | null {
    return this.users.find((u) => u.email === email) || null;
  }

  async register(dto: RegisterDto): Promise<{ access_token: string }> {
    const existing = this.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Ese correo ya está registrado');
    }

    const newUser: User = {
      id: this.users.length + 1,
      email: dto.email,
      name: dto.name,
      password: dto.password,
    };

    this.users.push(newUser);

    const token = await this.generarToken(newUser);

    // ❗ DEVOLVEMOS SOLO EL TOKEN
    return { access_token: token };
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user = this.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (user.password !== dto.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = await this.generarToken(user);

    // ❗ DEVOLVEMOS SOLO EL TOKEN
    return { access_token: token };
  }

  private async generarToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      // aquí puedes agregar más info si luego deseas:
      // role: user.role,
      // phone: user.phone,
    };

    return this.jwtService.signAsync(payload);
  }
}
