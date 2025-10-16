import { PartialType } from '@nestjs/mapped-types';
import { CreateParallelDto } from './create-parallel.dto';

export class UpdateParallelDto extends PartialType(CreateParallelDto) {}
