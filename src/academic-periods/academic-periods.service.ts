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

  async update(id: number, data: Partial<CreateAcademicPeriodDto>) {
    const exists = await this.prisma.academicPeriod.findUnique({
      where: { id },
    });
    if (!exists) throw new NotFoundException('AcademicPeriod not found');

    return this.prisma.academicPeriod.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.academicPeriod.findUnique({
      where: { id },
    });
    if (!exists) throw new NotFoundException('AcademicPeriod not found');

    await this.prisma.academicPeriod.delete({ where: { id } });
    return { message: 'AcademicPeriod deleted successfully' };
  }
}
