-- CreateTable
CREATE TABLE "SchoolCycle" (
    "schoolCycleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "enrollmentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "schoolCycleId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("studentId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Enrollment_schoolCycleId_fkey" FOREIGN KEY ("schoolCycleId") REFERENCES "SchoolCycle" ("schoolCycleId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Enrollment_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "CatalogItem" ("catalogItemId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Enrollment_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "CatalogItem" ("catalogItemId") ON DELETE RESTRICT ON UPDATE CASCADE
);
