import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.subject.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
        include: { career: true, cycle: true },
      }),
      this.prisma.subject.count(),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const item = await this.prisma.subject.findUnique({
      where: { id },
      include: { career: true, cycle: true, parallels: true },
    });
    if (!item) throw new NotFoundException('Subject not found');
    return item;
  }

  create(dto: CreateSubjectDto) {
    return this.prisma.subject.create({ data: dto });
  }
}
