import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';

@Injectable()
export class ClassroomsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.classroom.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.classroom.count(),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const item = await this.prisma.classroom.findUnique({
      where: { id },
      include: { parallels: true },
    });
    if (!item) throw new NotFoundException('Classroom not found');
    return item;
  }

  create(dto: CreateClassroomDto) {
    return this.prisma.classroom.create({ data: dto });
  }
}
