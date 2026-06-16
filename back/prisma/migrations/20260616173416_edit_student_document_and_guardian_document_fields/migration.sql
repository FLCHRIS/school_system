/*
  Warnings:

  - A unique constraint covering the columns `[guardianId,documentTypeId]` on the table `GuardianDocument` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,documentTypeId]` on the table `StudentDocument` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GuardianDocument_guardianId_documentTypeId_key" ON "GuardianDocument"("guardianId", "documentTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentDocument_studentId_documentTypeId_key" ON "StudentDocument"("studentId", "documentTypeId");
