import { Module } from '@nestjs/common';
import { TermCyclesService } from './term-cycles.service';
import { TermCyclesController } from './term-cycles.controller';

@Module({
  controllers: [TermCyclesController],
  providers: [TermCyclesService],
})
export class TermCyclesModule {}
