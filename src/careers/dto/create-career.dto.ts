export class CreateCareerDto {
  name: string;
  code: string;
  degree?: string;
  // institutionId no se envía: default(1) en Prisma
}
