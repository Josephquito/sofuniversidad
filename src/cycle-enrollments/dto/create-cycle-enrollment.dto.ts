export class CreateCycleEnrollmentDto {
  studentId: number;
  careerId: number;
  periodId: number;
  cycleId: number;
  status?: 'ENROLLED' | 'WITHDRAWN' | 'APPROVED' | 'FAILED';
  enrolledOn?: string; // ISO
}
