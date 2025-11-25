import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { TermCyclesService } from './term-cycles.service';
import { CreateTermCycleDto } from './dto/create-term-cycle.dto';

@Controller('term-cycles')
export class TermCyclesController {
  constructor(private service: TermCyclesService) {}
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
  create(@Body() dto: CreateTermCycleDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateTermCycleDto>,
  ) {
    return this.service.update(id, dto);
  }

  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateTermCycleDto>,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  Delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
