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
  [imageURL] nvarchar(255),
  [bio] nvarchar(255)
)
GO

CREATE TABLE [Stat] (
  [id] int PRIMARY KEY IDENTITY,
  [name] nvarchar(255)
)
GO

CREATE TABLE [Books] (
  [id] int PRIMARY KEY IDENTITY,
  [title] nvarchar(255),
  [currentPage] int,
  [totalPage] int,
  [genre]  nvarchar(255),
  [author]  nvarchar(255)
)
GO

CREATE TABLE [bookClub] (
  [id] int PRIMARY KEY IDENTITY,
  [userId] int,
  [bookId] int,
  [currentPage] int,
  [stat] VARCHAR(255),
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
  [bookId] int,
  [content] nvarchar(255),
  [sendDateTime] date
)
GO

ALTER TABLE [Books] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([id])
GO

ALTER TABLE [bookClub] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([id])
GO

ALTER TABLE [bookClub] ADD FOREIGN KEY ([stat]) REFERENCES [Stat] ([id])
GO

ALTER TABLE [Follow] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([id])
GO

ALTER TABLE [Message] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([id])
GO

ALTER TABLE [Message] ADD FOREIGN KEY ([bookId]) REFERENCES [Books] ([id])
GO