// src/cycle-enrollments/cycle-enrollments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCycleEnrollmentDto } from './dto/create-cycle-enrollment.dto';
import type { Prisma } from '@prisma/client';

type FindAllParams = {
  page?: number;
  limit?: number;
  studentId?: string;
  careerId?: string;
  periodId?: string;
  cycleId?: string;
  status?: string;
};

@Injectable()
export class CycleEnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: FindAllParams) {
    const {
      page = 1,
      limit = 10,
      studentId,
      careerId,
      periodId,
      cycleId,
      status,
    } = params;

    const where: Prisma.CycleEnrollmentWhereInput = {};

    if (studentId) where.studentId = Number(studentId);
    if (careerId) where.careerId = Number(careerId);
    if (periodId) where.periodId = Number(periodId);
    if (cycleId) where.cycleId = Number(cycleId);
    if (status) where.status = status;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.cycleEnrollment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          student: true,
          career: true,
          period: true,
          cycle: true,
        },
      }),
      this.prisma.cycleEnrollment.count({ where }),
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const e = await this.prisma.cycleEnrollment.findUnique({
      where: { id },
      include: { student: true, career: true, period: true, cycle: true },
    });
    if (!e) throw new NotFoundException('Cycle enrollment not found');
    return e;
  }

  async create(dto: CreateCycleEnrollmentDto) {
    return this.prisma.cycleEnrollment.create({
      data: {
        studentId: dto.studentId,
        careerId: dto.careerId,
        periodId: dto.periodId,
        cycleId: dto.cycleId,
        status: dto.status ?? 'ENROLLED',
        enrolledOn: dto.enrolledOn ? new Date(dto.enrolledOn) : undefined,
      },
    });
  }

  async update(id: number, data: Partial<CreateCycleEnrollmentDto>) {
    const exists = await this.prisma.cycleEnrollment.findUnique({
      where: { id },
    });
    if (!exists) throw new NotFoundException('Cycle enrollment not found');

    return this.prisma.cycleEnrollment.update({
      where: { id },
      data: {
        ...data,
        enrolledOn: data.enrolledOn ? new Date(data.enrolledOn) : undefined,
      },
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.cycleEnrollment.findUnique({
      where: { id },
    });
    if (!exists) throw new NotFoundException('Cycle enrollment not found');

    await this.prisma.cycleEnrollment.delete({ where: { id } });
    return { message: 'Cycle enrollment deleted successfully' };
  }
}
