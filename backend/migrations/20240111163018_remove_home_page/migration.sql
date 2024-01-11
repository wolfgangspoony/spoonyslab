/*
  Warnings:

  - You are about to drop the column `header` on the `SongsPage` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SongsPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "textBlock" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "profilePicture_filesize" INTEGER,
    "profilePicture_extension" TEXT,
    "profilePicture_width" INTEGER,
    "profilePicture_height" INTEGER,
    "profilePicture_id" TEXT,
    "featuredHeader" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_SongsPage" ("featuredHeader", "id") SELECT "featuredHeader", "id" FROM "SongsPage";
DROP TABLE "SongsPage";
ALTER TABLE "new_SongsPage" RENAME TO "SongsPage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
