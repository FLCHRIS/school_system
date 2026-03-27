/*
  Warnings:

  - You are about to drop the column `order` on the `CatalogItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CatalogItem" (
    "catalogItemId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "catalogId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CatalogItem_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog" ("catalogId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CatalogItem" ("catalogId", "catalogItemId", "createdAt", "isActive", "name", "updatedAt") SELECT "catalogId", "catalogItemId", "createdAt", "isActive", "name", "updatedAt" FROM "CatalogItem";
DROP TABLE "CatalogItem";
ALTER TABLE "new_CatalogItem" RENAME TO "CatalogItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
