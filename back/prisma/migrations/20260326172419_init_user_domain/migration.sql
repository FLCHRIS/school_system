-- CreateTable
CREATE TABLE "PersonalInfo" (
    "personalInfoId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "genderId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PersonalInfo_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "CatalogItem" ("catalogItemId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "contactInfoId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProfilePhoto" (
    "profilePhotoId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publicId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT,
    "password" TEXT,
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

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_personalInfoId_key" ON "User"("personalInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "User_contactInfoId_key" ON "User"("contactInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "User_profilePhotoId_key" ON "User"("profilePhotoId");
