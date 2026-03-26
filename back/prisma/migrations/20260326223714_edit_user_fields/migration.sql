/*
  Warnings:

  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "personalInfoId" INTEGER NOT NULL,
    "contactInfoId" INTEGER NOT NULL,
    "profilePhotoId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "CatalogItem" ("catalogItemId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "CatalogItem" ("catalogItemId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_personalInfoId_fkey" FOREIGN KEY ("personalInfoId") REFERENCES "PersonalInfo" ("personalInfoId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo" ("contactInfoId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_profilePhotoId_fkey" FOREIGN KEY ("profilePhotoId") REFERENCES "ProfilePhoto" ("profilePhotoId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("contactInfoId", "createdAt", "password", "personalInfoId", "profilePhotoId", "roleId", "statusId", "updatedAt", "userId", "username") SELECT "contactInfoId", "createdAt", "password", "personalInfoId", "profilePhotoId", "roleId", "statusId", "updatedAt", "userId", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_personalInfoId_key" ON "User"("personalInfoId");
CREATE UNIQUE INDEX "User_contactInfoId_key" ON "User"("contactInfoId");
CREATE UNIQUE INDEX "User_profilePhotoId_key" ON "User"("profilePhotoId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
