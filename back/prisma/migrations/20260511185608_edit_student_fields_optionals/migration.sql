-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "studentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "guardianId" INTEGER NOT NULL,
    "studentStatusId" INTEGER NOT NULL,
    "enrollmentNumber" TEXT,
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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
