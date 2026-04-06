-- CreateTable
CREATE TABLE "StudentDocument" (
    "studentDocumentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "documentTypeId" INTEGER NOT NULL,
    "publicId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StudentDocument_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("studentId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentDocument_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "CatalogItem" ("catalogItemId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GuardianDocument" (
    "guardianDocumentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guardianId" INTEGER NOT NULL,
    "documentTypeId" INTEGER NOT NULL,
    "publicId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GuardianDocument_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "Guardian" ("guardianId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GuardianDocument_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "CatalogItem" ("catalogItemId") ON DELETE RESTRICT ON UPDATE CASCADE
);
