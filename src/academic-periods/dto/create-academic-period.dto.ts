export class CreateAcademicPeriodDto {
  name: string;
  startDate: string; // ISO
  endDate: string; // ISO
  state?: boolean;
}
