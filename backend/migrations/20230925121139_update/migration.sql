-- AlterTable
ALTER TABLE "HomePage" ADD COLUMN "splashPortrait_extension" TEXT;
ALTER TABLE "HomePage" ADD COLUMN "splashPortrait_filesize" INTEGER;
ALTER TABLE "HomePage" ADD COLUMN "splashPortrait_height" INTEGER;
ALTER TABLE "HomePage" ADD COLUMN "splashPortrait_id" TEXT;
ALTER TABLE "HomePage" ADD COLUMN "splashPortrait_width" INTEGER;

-- CreateTable
CREATE TABLE "SongsPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "header" TEXT NOT NULL DEFAULT '',
    "featuredHeader" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "_SongsPage_featuredSongs" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SongsPage_featuredSongs_A_fkey" FOREIGN KEY ("A") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SongsPage_featuredSongs_B_fkey" FOREIGN KEY ("B") REFERENCES "SongsPage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_SongsPage_featuredSongs_AB_unique" ON "_SongsPage_featuredSongs"("A", "B");

-- CreateIndex
CREATE INDEX "_SongsPage_featuredSongs_B_index" ON "_SongsPage_featuredSongs"("B");
