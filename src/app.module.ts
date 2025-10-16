import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { CareersModule } from './careers/careers.module';
import { TermCyclesModule } from './term-cycles/term-cycles.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TeachersModule } from './teachers/teachers.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { AcademicPeriodsModule } from './academic-periods/academic-periods.module';
import { ParallelsModule } from './parallels/parallels.module';
import { StudentsModule } from './students/students.module';
import { CycleEnrollmentsModule } from './cycle-enrollments/cycle-enrollments.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    InstitutionsModule,
    CareersModule,
    TermCyclesModule,
    SubjectsModule,
    TeachersModule,
    ClassroomsModule,
    AcademicPeriodsModule,
    ParallelsModule,
    StudentsModule,
    CycleEnrollmentsModule,
  ],
})
export class AppModule {}
