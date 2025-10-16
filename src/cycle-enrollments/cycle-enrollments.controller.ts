import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CycleEnrollmentsService } from './cycle-enrollments.service';
import { CreateCycleEnrollmentDto } from './dto/create-cycle-enrollment.dto';

@Controller('cycle-enrollments')
export class CycleEnrollmentsController {
  constructor(private service: CycleEnrollmentsService) {}
  private p(v?: string) {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }
  private l(v?: string) {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : 10;
  }
  private toNum = (v?: string, def = 1) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : def;
  };

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('studentId') studentId?: string,
    @Query('careerId') careerId?: string,
    @Query('periodId') periodId?: string,
    @Query('cycleId') cycleId?: string,
    @Query('status') status?: string,
  ) {
    return this.service.findAll({
      page: this.toNum(page, 1),
      limit: this.toNum(limit, 10),
      studentId,
      careerId,
      periodId,
      cycleId,
      status,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCycleEnrollmentDto) {
    return this.service.create(dto);
  }
}
