import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.teacher.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.teacher.count(),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const item = await this.prisma.teacher.findUnique({
      where: { id },
      include: { user: true, parallels: true },
    });
    if (!item) throw new NotFoundException('Teacher not found');
    return item;
  }

  create(dto: CreateTeacherDto) {
    return this.prisma.teacher.create({ data: dto });
  }

  async update(id: number, data: Partial<CreateTeacherDto>) {
    const exists = await this.prisma.teacher.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Teacher not found');

    return this.prisma.teacher.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.teacher.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Teacher not found');

    await this.prisma.teacher.delete({ where: { id } });
    return { message: 'Teacher deleted successfully' };
  }
}
