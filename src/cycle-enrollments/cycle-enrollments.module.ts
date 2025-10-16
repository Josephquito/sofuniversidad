import { Module } from '@nestjs/common';
import { CycleEnrollmentsService } from './cycle-enrollments.service';
import { CycleEnrollmentsController } from './cycle-enrollments.controller';

@Module({
  controllers: [CycleEnrollmentsController],
  providers: [CycleEnrollmentsService],
})
export class CycleEnrollmentsModule {}
