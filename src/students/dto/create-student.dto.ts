export class CreateStudentDto {
  cedula: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status?: boolean;
  userId?: number;
}
