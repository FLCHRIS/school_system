-- CreateTable
CREATE TABLE "Student" (
    "studentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "guardianId" INTEGER NOT NULL,
    "studentStatusId" INTEGER NOT NULL,
    "enrollmentNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");
