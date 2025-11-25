// src/students/students.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import type { Prisma } from '@prisma/client';

type FindAllParams = {
  page?: number;
  limit?: number;
  cedula?: string;
  name?: string;
  status?: string; // viene como query string
};

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ page = 1, limit = 10, cedula, name, status }: FindAllParams) {
    const where: Prisma.StudentWhereInput = {};

    if (cedula) {
      where.cedula = { contains: cedula };
    }

    if (typeof status !== 'undefined') {
      const s = status.toLowerCase();
      where.status = s === 'true' || s === '1';
    }

    if (name) {
      where.OR = [
        { firstName: { contains: name, mode: 'insensitive' } },
        { lastName: { contains: name, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.student.count({ where }),
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const s = await this.prisma.student.findUnique({
      where: { id },
      include: { enrollments: true, user: true },
    });
    if (!s) throw new NotFoundException('Student not found');
    return s;
  }

  create(dto: CreateStudentDto) {
    return this.prisma.student.create({ data: dto });
  }

  async update(id: number, data: Partial<CreateStudentDto>) {
    const exists = await this.prisma.student.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Student not found');

    return this.prisma.student.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.student.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Student not found');

    await this.prisma.student.delete({ where: { id } });
    return { message: 'Student deleted successfully' };
  }
}
