import { PartialType } from '@nestjs/mapped-types';
import { CreateTermCycleDto } from './create-term-cycle.dto';

export class UpdateTermCycleDto extends PartialType(CreateTermCycleDto) {}
