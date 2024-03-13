USE [Bookshelf];
GO

set identity_insert [User] on
insert into [User] (id, firstName, lastName, userName, imageUrl, password) values (1, 'Gloriana', 'Morfield', 'gmorfield0', 'https://robohash.org/utaperiamneque.png?size=50x50&set=set1', 'pass');
insert into [User] (id, firstName, lastName, userName, imageUrl, password) values (2, 'Gasper', 'Manlow', 'gmanlow1', 'https://robohash.org/voluptatibusdolorrerum.png?size=50x50&set=set1', 'pass1');
insert into [User](id, firstName, lastName, userName, imageUrl, password) values (3, 'Fifine', 'Suffield', 'fsuffield2', 'https://robohash.org/etaspernaturipsum.png?size=50x50&set=set1', 'pass2');
set identity_insert [User] off

set identity_insert [Books] on
insert into Books (id, userId, title, totalPage, genre, author) values (1, 1, 'Throne of Glass',  388, 'Fiction', 'Sarah J. Maas');
insert into Books (id, userId, title, totalPage, genre, author) values (2, 2, 'Song of Achilles', 258, 'Fiction', 'Madeline Miller');
insert into Books (id, userId, title, totalPage, genre, author) values (3, 3, 'Crescent City', 419,'Fiction', 'Sarah J. Maas');
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
