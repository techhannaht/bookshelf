USE [master]

IF db_id('Bookshelf') IS NULL
  CREATE DATABASE [Bookshelf]
GO

USE [Bookshelf]
GO

DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Books];
DROP TABLE IF EXISTS [Author];
DROP TABLE IF EXISTS [Genre];
DROP TABLE IF EXISTS [bookClub];
DROP TABLE IF EXISTS [Follow];
DROP TABLE IF EXISTS [Message];
GO

CREATE TABLE [User] (
  [id] int PRIMARY KEY IDENTITY,
  [userName] nvarchar(255),
  [password] nvarchar(255),
  [firstName] nvarchar(255),
  [lastName] nvarchar(255),
  [imageURL] nvarchar(255)
)
GO

CREATE TABLE [Genre] (
  [id] int PRIMARY KEY IDENTITY,
  [name] nvarchar(255)
)
GO

CREATE TABLE [Author] (
  [id] int PRIMARY KEY IDENTITY,
  [name] nvarchar(255)
)
GO

CREATE TABLE [Books] (
  [id] int PRIMARY KEY IDENTITY,
  [userId] int,
  [title] nvarchar(255),
  [currentPage] nvarchar(255),
  [totalPage] int,
  [genreId] int,
  [authorId] int,
)
GO

CREATE TABLE [bookClub] (
  [id] int PRIMARY KEY IDENTITY,
  [userId] int,
  [bookId] int,
)
GO

CREATE TABLE [Follow] (
  [id] int PRIMARY KEY IDENTITY,
  [userId] int,
  [friendId] int
)
GO

CREATE TABLE [Message] (
  [id] int PRIMARY KEY IDENTITY,
  [userId] int,
  [bookClubId] int,
  [content] nvarchar(255),
  [sendDateTime] date
)
GO

ALTER TABLE [Books] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([id])
GO

ALTER TABLE [Books] ADD FOREIGN KEY ([authorId]) REFERENCES [Author] ([id])
G

ALTER TABLE [bookClub] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([id])
GO

ALTER TABLE [Books] ADD FOREIGN KEY ([genreId]) REFERENCES [Genre] ([id])
GO

ALTER TABLE [Follow] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([id])
GO

ALTER TABLE [Message] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([id])
GO

ALTER TABLE [Message] ADD FOREIGN KEY ([bookClubId]) REFERENCES [bookClub] ([id])
GO