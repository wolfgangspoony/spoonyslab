-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME DEFAULT '1970-01-01 00:00:00 +00:00'
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "price" REAL NOT NULL,
    "thumbnail_filesize" INTEGER,
    "thumbnail_extension" TEXT,
    "thumbnail_width" INTEGER,
    "thumbnail_height" INTEGER,
    "thumbnail_id" TEXT,
    "songPreview_filesize" INTEGER,
    "songPreview_filename" TEXT,
    "createdAt" DATETIME DEFAULT '1970-01-01 00:00:00 +00:00'
);

-- CreateTable
CREATE TABLE "AboutPage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]'
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
