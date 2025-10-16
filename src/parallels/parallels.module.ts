import { Module } from '@nestjs/common';
import { ParallelsService } from './parallels.service';
import { ParallelsController } from './parallels.controller';

@Module({
  controllers: [ParallelsController],
  providers: [ParallelsService],
})
export class ParallelsModule {}
