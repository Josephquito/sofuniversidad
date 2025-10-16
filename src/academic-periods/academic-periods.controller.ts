import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AcademicPeriodsService } from './academic-periods.service';
import { CreateAcademicPeriodDto } from './dto/create-academic-period.dto';

@Controller('academic-periods')
export class AcademicPeriodsController {
  constructor(private service: AcademicPeriodsService) {}
  private p(v?: string) {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }
  private l(v?: string) {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : 10;
  }

  @Get()
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(this.p(page), this.l(limit));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateAcademicPeriodDto) {
    return this.service.create(dto);
  }
}
