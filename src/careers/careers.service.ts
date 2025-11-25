import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCareerDto } from './dto/create-career.dto';

@Injectable()
export class CareersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.career.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
        include: { institution: true },
      }),
      this.prisma.career.count(),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const item = await this.prisma.career.findUnique({
      where: { id },
      include: { institution: true, subjects: true },
    });
    if (!item) throw new NotFoundException('Career not found');
    return item;
  }

  create(dto: CreateCareerDto) {
    return this.prisma.career.create({ data: dto });
  }

  async update(id: number, data: Partial<CreateCareerDto>) {
    const exists = await this.prisma.career.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Career not found');

    return this.prisma.career.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.career.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Career not found');

    await this.prisma.career.delete({ where: { id } });
    return { message: 'Career deleted successfully' };
  }
}
