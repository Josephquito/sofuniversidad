/*
  Warnings:

  - You are about to drop the `academic_period` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `career` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classroom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cycle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `institution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `registration_Cycle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `registration_group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teacher_title` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `title` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."career" DROP CONSTRAINT "career_institution_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."group" DROP CONSTRAINT "group_academic_period_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."group" DROP CONSTRAINT "group_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."group" DROP CONSTRAINT "group_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."group" DROP CONSTRAINT "group_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."registration_Cycle" DROP CONSTRAINT "registration_Cycle_academic_period_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."registration_Cycle" DROP CONSTRAINT "registration_Cycle_career_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."registration_Cycle" DROP CONSTRAINT "registration_Cycle_cycle_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."registration_Cycle" DROP CONSTRAINT "registration_Cycle_student_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."registration_group" DROP CONSTRAINT "registration_group_group_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."registration_group" DROP CONSTRAINT "registration_group_registration_cycle_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."schedule" DROP CONSTRAINT "schedule_group_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."subject" DROP CONSTRAINT "subject_career_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."subject" DROP CONSTRAINT "subject_cycle_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."teacher_title" DROP CONSTRAINT "teacher_title_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."teacher_title" DROP CONSTRAINT "teacher_title_title_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_role_id_fkey";

-- DropTable
DROP TABLE "public"."academic_period";

-- DropTable
DROP TABLE "public"."career";

-- DropTable
DROP TABLE "public"."classroom";

-- DropTable
DROP TABLE "public"."cycle";

-- DropTable
DROP TABLE "public"."group";

-- DropTable
DROP TABLE "public"."institution";

-- DropTable
DROP TABLE "public"."registration_Cycle";

-- DropTable
DROP TABLE "public"."registration_group";

-- DropTable
DROP TABLE "public"."role";

-- DropTable
DROP TABLE "public"."schedule";

-- DropTable
DROP TABLE "public"."student";

-- DropTable
DROP TABLE "public"."subject";

-- DropTable
DROP TABLE "public"."teacher";

-- DropTable
DROP TABLE "public"."teacher_title";

-- DropTable
DROP TABLE "public"."title";

-- DropTable
DROP TABLE "public"."user";

-- DropEnum
DROP TYPE "public"."CourseStatus";

-- DropEnum
DROP TYPE "public"."EnrollmentStatus";

-- DropEnum
DROP TYPE "public"."PeriodStatus";

-- DropEnum
DROP TYPE "public"."WeekDay";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institution" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" SERIAL NOT NULL,
    "institutionId" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "degree" TEXT,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermCycle" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "TermCycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "hours" INTEGER NOT NULL,
    "careerId" INTEGER NOT NULL,
    "cycleId" INTEGER NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "building" TEXT,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicPeriod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AcademicPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parallel" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "periodId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "classroomId" INTEGER NOT NULL,
    "section" TEXT NOT NULL,

    CONSTRAINT "Parallel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "cedula" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CycleEnrollment" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "careerId" INTEGER NOT NULL,
    "periodId" INTEGER NOT NULL,
    "cycleId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ENROLLED',
    "enrolledOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CycleEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_name_key" ON "Institution"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Career_code_key" ON "Career"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_cedula_key" ON "Teacher"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userId_key" ON "Teacher"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_code_key" ON "Classroom"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Parallel_subjectId_periodId_section_key" ON "Parallel"("subjectId", "periodId", "section");

-- CreateIndex
CREATE UNIQUE INDEX "Student_cedula_key" ON "Student"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CycleEnrollment_studentId_careerId_periodId_cycleId_key" ON "CycleEnrollment"("studentId", "careerId", "periodId", "cycleId");

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "TermCycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parallel" ADD CONSTRAINT "Parallel_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parallel" ADD CONSTRAINT "Parallel_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "AcademicPeriod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parallel" ADD CONSTRAINT "Parallel_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parallel" ADD CONSTRAINT "Parallel_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CycleEnrollment" ADD CONSTRAINT "CycleEnrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CycleEnrollment" ADD CONSTRAINT "CycleEnrollment_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CycleEnrollment" ADD CONSTRAINT "CycleEnrollment_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "AcademicPeriod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CycleEnrollment" ADD CONSTRAINT "CycleEnrollment_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "TermCycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
