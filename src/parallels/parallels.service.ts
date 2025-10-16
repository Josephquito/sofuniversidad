import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateParallelDto } from './dto/create-parallel.dto';

@Injectable()
export class ParallelsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.parallel.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          subject: true,
          period: true,
          teacher: true,
          classroom: true,
        },
      }),
      this.prisma.parallel.count(),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const item = await this.prisma.parallel.findUnique({
      where: { id },
      include: { subject: true, period: true, teacher: true, classroom: true },
    });
    if (!item) throw new NotFoundException('Parallel not found');
    return item;
  }

  create(dto: CreateParallelDto) {
    return this.prisma.parallel.create({ data: dto });
  }
}
