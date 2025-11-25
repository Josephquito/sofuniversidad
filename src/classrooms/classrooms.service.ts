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

  async update(id: number, data: Partial<CreateClassroomDto>) {
    const exists = await this.prisma.classroom.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Classroom not found');

    return this.prisma.classroom.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.classroom.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Classroom not found');

    await this.prisma.classroom.delete({ where: { id } });
    return { message: 'Classroom deleted successfully' };
  }
}
