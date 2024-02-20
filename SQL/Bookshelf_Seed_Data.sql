USE [Bookshelf];
GO

set identity_insert [User] on
insert into [User] (id, firstName, lastName, userName, imageUrl, password) values (1, 'Gloriana', 'Morfield', 'gmorfield0', 'https://robohash.org/utaperiamneque.png?size=50x50&set=set1', 'pass');
insert into [User] (id, firstName, lastName, userName, imageUrl, password) values (2, 'Gasper', 'Manlow', 'gmanlow1', 'https://robohash.org/voluptatibusdolorrerum.png?size=50x50&set=set1', 'pass1');
insert into [User](id, firstName, lastName, userName, imageUrl, password) values (3, 'Fifine', 'Suffield', 'fsuffield2', 'https://robohash.org/etaspernaturipsum.png?size=50x50&set=set1', 'pass2');
set identity_insert [User] off

set identity_insert [Genre] on
insert into Genre (id, name) values (1, 'Fiction');
insert into Genre (id, name) values (2, 'Non-Fiction');
insert into Genre (id, name) values (3, 'Self-Help');
insert into Genre (id, name) values (4, 'Mystery');
insert into Genre (id, name) values (5, 'Adventure');
set identity_insert [Genre] off

set identity_insert [Author] on
insert into Author (id, name) values (1, 'Sarah J. Maas');
insert into Author (id, name) values (2, 'Madeline Miller');
set identity_insert [Author] off

set identity_insert [Books] on
insert into Books (id, userId, title, currentPage, totalPage, genreId, authorId) values (1, 1, 'Throne of Glass', 24, 388, 1, 1);
insert into Books (id, userId, title, currentPage, totalPage, genreId, authorId) values (2, 2, 'Song of Achilles', 63, 258, 2, 2);
insert into Books (id, userId, title, currentPage, totalPage, genreId, authorId) values (3, 3, 'Crescent City', 134, 419, 1, 1);
set identity_insert [Books] off

set identity_insert [bookClub] on
insert into bookClub (id, userId, bookId) values (1, 1, 1);
insert into bookClub (id, userId, bookId) values (2, 2, 2);
insert into bookClub (id, userId, bookId) values (3, 3, 3);
set identity_insert [bookClub] off

set identity_insert [Follow] on
insert into Follow (id, userId, friendId) values (1, 1, 1);
insert into Follow (id, userId, friendId) values (2, 2, 2);
insert into Follow (id, userId, friendId) values (3, 3, 3);
set identity_insert [Follow] off

set identity_insert [Message] on
insert into Message (id, userId, bookClubId, content, sendDateTime) values (1, 1, 1, 'envisioneer next-generation initiatives', '7/19/2023');
insert into Message (id, userId, bookClubId, content, sendDateTime) values (2, 2, 2, 'orchestrate integrated initiatives', '4/25/2023');
insert into Message (id, userId, bookClubId, content, sendDateTime) values (3, 3, 3, 'synergize vertical e-business', '5/31/2023');
set identity_insert [Message] off
