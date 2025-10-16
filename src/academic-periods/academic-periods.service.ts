import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAcademicPeriodDto } from './dto/create-academic-period.dto';

@Injectable()
export class AcademicPeriodsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.academicPeriod.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.academicPeriod.count(),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const item = await this.prisma.academicPeriod.findUnique({
      where: { id },
      include: { parallels: true, enrollments: true },
    });
    if (!item) throw new NotFoundException('AcademicPeriod not found');
    return item;
  }

  create(dto: CreateAcademicPeriodDto) {
    return this.prisma.academicPeriod.create({
      data: {
        name: dto.name,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        state: dto.state ?? true,
      },
    });
  }
}
