/*
  Warnings:

  - You are about to drop the column `price` on the `Song` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Song" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "datePosted" TEXT NOT NULL DEFAULT '',
    "thumbnail_filesize" INTEGER,
    "thumbnail_extension" TEXT,
    "thumbnail_width" INTEGER,
    "thumbnail_height" INTEGER,
    "thumbnail_id" TEXT,
    "songPreview_filesize" INTEGER,
    "songPreview_filename" TEXT,
    "createdAt" DATETIME DEFAULT '1970-01-01 00:00:00 +00:00'
);
INSERT INTO "new_Song" ("createdAt", "id", "songPreview_filename", "songPreview_filesize", "thumbnail_extension", "thumbnail_filesize", "thumbnail_height", "thumbnail_id", "thumbnail_width", "title") SELECT "createdAt", "id", "songPreview_filename", "songPreview_filesize", "thumbnail_extension", "thumbnail_filesize", "thumbnail_height", "thumbnail_id", "thumbnail_width", "title" FROM "Song";
DROP TABLE "Song";
ALTER TABLE "new_Song" RENAME TO "Song";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
