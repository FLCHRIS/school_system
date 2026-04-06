/*
  Warnings:

  - Added the required column `enrollmentStatusId` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Subject" (
    "subjectId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TeacherAssignment" (
    "teacherAssignmentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teacherId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "schoolCycleId" INTEGER NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TeacherAssignment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("teacherId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeacherAssignment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("subjectId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeacherAssignment_schoolCycleId_fkey" FOREIGN KEY ("schoolCycleId") REFERENCES "SchoolCycle" ("schoolCycleId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeacherAssignment_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "CatalogItem" ("catalogItemId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeacherAssignment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "CatalogItem" ("catalogItemId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GradeRecord" (
    "gradeRecordId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "enrollmentId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "evaluationPeriodId" INTEGER NOT NULL,
    "score" REAL NOT NULL,
    "evaluationDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GradeRecord_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("subjectId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GradeRecord_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("teacherId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GradeRecord_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment" ("enrollmentId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GradeRecord_evaluationPeriodId_fkey" FOREIGN KEY ("evaluationPeriodId") REFERENCES "EvaluationPeriod" ("evaluationPeriodId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportCard" (
    "reportCardId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "enrollmentId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "generatedBy" INTEGER NOT NULL,
    "evaluationPeriodId" INTEGER NOT NULL,
    "generationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ReportCard_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment" ("enrollmentId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReportCard_evaluationPeriodId_fkey" FOREIGN KEY ("evaluationPeriodId") REFERENCES "EvaluationPeriod" ("evaluationPeriodId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReportCard_generatedBy_fkey" FOREIGN KEY ("generatedBy") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReportCard_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "CatalogItem" ("catalogItemId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EvaluationPeriod" (
    "evaluationPeriodId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "schoolCycleId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EvaluationPeriod_schoolCycleId_fkey" FOREIGN KEY ("schoolCycleId") REFERENCES "SchoolCycle" ("schoolCycleId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Enrollment" (
    "enrollmentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "schoolCycleId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "enrollmentStatusId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("studentId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Enrollment_schoolCycleId_fkey" FOREIGN KEY ("schoolCycleId") REFERENCES "SchoolCycle" ("schoolCycleId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Enrollment_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "CatalogItem" ("catalogItemId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Enrollment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "CatalogItem" ("catalogItemId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Enrollment_enrollmentStatusId_fkey" FOREIGN KEY ("enrollmentStatusId") REFERENCES "CatalogItem" ("catalogItemId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Enrollment" ("createdAt", "enrollmentId", "gradeId", "groupId", "schoolCycleId", "studentId", "updatedAt") SELECT "createdAt", "enrollmentId", "gradeId", "groupId", "schoolCycleId", "studentId", "updatedAt" FROM "Enrollment";
DROP TABLE "Enrollment";
ALTER TABLE "new_Enrollment" RENAME TO "Enrollment";
CREATE UNIQUE INDEX "Enrollment_studentId_schoolCycleId_key" ON "Enrollment"("studentId", "schoolCycleId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherAssignment_teacherId_subjectId_schoolCycleId_gradeId_groupId_key" ON "TeacherAssignment"("teacherId", "subjectId", "schoolCycleId", "gradeId", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "EvaluationPeriod_schoolCycleId_name_key" ON "EvaluationPeriod"("schoolCycleId", "name");
