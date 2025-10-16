import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTermCycleDto } from './dto/create-term-cycle.dto';

@Injectable()
export class TermCyclesService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.termCycle.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.termCycle.count(),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const item = await this.prisma.termCycle.findUnique({
      where: { id },
      include: { subjects: true },
    });
    if (!item) throw new NotFoundException('TermCycle not found');
    return item;
  }

  create(dto: CreateTermCycleDto) {
    return this.prisma.termCycle.create({ data: dto });
  }
}
