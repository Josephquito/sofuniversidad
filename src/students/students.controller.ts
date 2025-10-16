import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private service: StudentsService) {}
  private p(v?: string) {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }
  private l(v?: string) {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : 10;
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('cedula') cedula?: string,
    @Query('name') name?: string,
    @Query('status') status?: string,
  ) {
    return this.service.findAll({
      page: this.p(page),
      limit: this.l(limit),
      cedula,
      name,
      status,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateStudentDto) {
    return this.service.create(dto);
  }
}
