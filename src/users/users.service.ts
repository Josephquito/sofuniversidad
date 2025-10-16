import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.user.count(),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const item = await this.prisma.user.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('User not found');
    return item;
  }

  create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: dto });
  }
}
