import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';

@Injectable()
export class InstitutionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.institution.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.institution.count(),
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const item = await this.prisma.institution.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Institution not found');
    return item;
  }

  create(dto: CreateInstitutionDto) {
    return this.prisma.institution.create({ data: dto });
  }

  async update(id: number, data: Partial<CreateInstitutionDto>) {
    const exists = await this.prisma.institution.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Institution not found');

    return this.prisma.institution.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.institution.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Institution not found');

    await this.prisma.institution.delete({ where: { id } });
    return { message: 'Institution deleted successfully' };
  }
}
