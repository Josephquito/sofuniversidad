import { PartialType } from '@nestjs/mapped-types';
import { CreateCycleEnrollmentDto } from './create-cycle-enrollment.dto';

export class UpdateCycleEnrollmentDto extends PartialType(CreateCycleEnrollmentDto) {}
