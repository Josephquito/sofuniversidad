-- CreateEnum
CREATE TYPE "PeriodStatus" AS ENUM ('ABIERTO', 'CERRADO');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('EN_CURSO', 'APROBADO', 'REPROBADO', 'RETIRADO');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('INSCRITO', 'APROBADO', 'REPROBADO', 'RETIRADO');

-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM');

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institution" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "career" (
    "id" SERIAL NOT NULL,
    "institution_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cycle" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "hours" INTEGER NOT NULL,
    "career_id" INTEGER NOT NULL,
    "cycle_id" INTEGER NOT NULL,

    CONSTRAINT "subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "nui" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "title" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher_title" (
    "id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "title_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teacher_title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classroom" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_period" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "PeriodStatus" NOT NULL DEFAULT 'ABIERTO',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "classroom_id" INTEGER NOT NULL,
    "academic_period_id" INTEGER NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "nui" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registration_Cycle" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "academic_period_id" INTEGER NOT NULL,
    "cycle_id" INTEGER NOT NULL,
    "career_id" INTEGER NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "EnrollmentStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registration_Cycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registration_group" (
    "id" SERIAL NOT NULL,
    "registration_cycle_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "status" "CourseStatus" NOT NULL DEFAULT 'INSCRITO',
    "tried" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registration_group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "career_code_key" ON "career"("code");

-- CreateIndex
CREATE INDEX "subject_cycle_id_idx" ON "subject"("cycle_id");

-- CreateIndex
CREATE UNIQUE INDEX "subject_career_id_code_key" ON "subject"("career_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_nui_key" ON "teacher"("nui");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_email_key" ON "teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_title_teacher_id_title_id_key" ON "teacher_title"("teacher_id", "title_id");

-- CreateIndex
CREATE UNIQUE INDEX "classroom_code_key" ON "classroom"("code");

-- CreateIndex
CREATE UNIQUE INDEX "academic_period_name_key" ON "academic_period"("name");

-- CreateIndex
CREATE INDEX "group_academic_period_id_idx" ON "group"("academic_period_id");

-- CreateIndex
CREATE INDEX "group_teacher_id_idx" ON "group"("teacher_id");

-- CreateIndex
CREATE INDEX "group_classroom_id_idx" ON "group"("classroom_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_nui_key" ON "student"("nui");

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");

-- CreateIndex
CREATE INDEX "registration_Cycle_career_id_cycle_id_idx" ON "registration_Cycle"("career_id", "cycle_id");

-- CreateIndex
CREATE UNIQUE INDEX "registration_Cycle_student_id_academic_period_id_key" ON "registration_Cycle"("student_id", "academic_period_id");

-- CreateIndex
CREATE INDEX "registration_group_group_id_idx" ON "registration_group"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "registration_group_registration_cycle_id_group_id_key" ON "registration_group"("registration_cycle_id", "group_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career" ADD CONSTRAINT "career_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_cycle_id_fkey" FOREIGN KEY ("cycle_id") REFERENCES "cycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_title" ADD CONSTRAINT "teacher_title_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_title" ADD CONSTRAINT "teacher_title_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_academic_period_id_fkey" FOREIGN KEY ("academic_period_id") REFERENCES "academic_period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_Cycle" ADD CONSTRAINT "registration_Cycle_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_Cycle" ADD CONSTRAINT "registration_Cycle_academic_period_id_fkey" FOREIGN KEY ("academic_period_id") REFERENCES "academic_period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_Cycle" ADD CONSTRAINT "registration_Cycle_cycle_id_fkey" FOREIGN KEY ("cycle_id") REFERENCES "cycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_Cycle" ADD CONSTRAINT "registration_Cycle_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_group" ADD CONSTRAINT "registration_group_registration_cycle_id_fkey" FOREIGN KEY ("registration_cycle_id") REFERENCES "registration_Cycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_group" ADD CONSTRAINT "registration_group_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
