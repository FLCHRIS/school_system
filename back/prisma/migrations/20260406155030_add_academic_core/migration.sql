-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guardian" (
    "guardianId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Guardian_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guardian_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("addressId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guardian" ("addressId", "createdAt", "guardianId", "updatedAt", "userId") SELECT "addressId", "createdAt", "guardianId", "updatedAt", "userId" FROM "Guardian";
DROP TABLE "Guardian";
ALTER TABLE "new_Guardian" RENAME TO "Guardian";
CREATE UNIQUE INDEX "Guardian_userId_key" ON "Guardian"("userId");
CREATE TABLE "new_Student" (
    "studentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "guardianId" INTEGER NOT NULL,
    "studentStatusId" INTEGER NOT NULL,
    "enrollmentNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("addressId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "Guardian" ("guardianId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_studentStatusId_fkey" FOREIGN KEY ("studentStatusId") REFERENCES "CatalogItem" ("catalogItemId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("addressId", "createdAt", "enrollmentNumber", "guardianId", "studentId", "studentStatusId", "updatedAt", "userId") SELECT "addressId", "createdAt", "enrollmentNumber", "guardianId", "studentId", "studentStatusId", "updatedAt", "userId" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");
CREATE TABLE "new_Teacher" (
    "teacherId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Teacher" ("createdAt", "teacherId", "updatedAt", "userId") SELECT "createdAt", "teacherId", "updatedAt", "userId" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_userId_key" ON "Teacher"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
