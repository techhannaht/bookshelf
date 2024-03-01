using bookshelf.Models;
using bookshelf.Utils;
using Microsoft.Data.SqlClient;

namespace bookshelf.Repositories
{
    public class BookRepository : BaseRepository, IBookRepository
    {

        public BookRepository(IConfiguration configuration) : base(configuration) { }
        public List<Book> GetAllBooksByUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT b.id, b.userId, b.title, b.currentPage, b.totalPage, b.genreId, b.authorId,a.id AS ""Author Id"", a.name AS ""Author Name"", g.id AS ""Genre Id"", g.name AS ""Genre Name"", 
                                    u.id AS ""User Id"", u.firstName, u.lastName, u.userName, u.password, u.imageURL
                                    FROM Books b
                                    LEFT JOIN Author a ON b.authorId = a.id
                                    LEFT JOIN Genre g ON b.genreId = g.id
                                    LEFT JOIN [User] u ON b.userId = u.id
                                    WHERE u.Id = @userId
                       ";

                    cmd.Parameters.AddWithValue("@userid", id);
                    var reader = cmd.ExecuteReader();

                    var books = new List<Book>();

                    while (reader.Read())
                    {
                        books.Add(NewBookFromReader(reader));
                    }

                    reader.Close();

                    return books;
                }
            }
        }

        public List<Book> GetAllBooks()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT b.id, b.userId, b.title, b.currentPage, b.totalPage, b.genreId, b.authorId,a.id AS ""Author Id"", a.name AS ""Author Name"", g.id AS ""Genre Id"", g.name AS ""Genre Name"", 
                                    u.id AS ""User Id"", u.firstName, u.lastName, u.userName, u.password, u.imageURL
                                    FROM Books b
                                    LEFT JOIN Author a ON b.authorId = a.id
                                    LEFT JOIN Genre g ON b.genreId = g.id
                                    LEFT JOIN [User] u ON b.userId = u.id
                       ";


                    var reader = cmd.ExecuteReader();

                    var books = new List<Book>();

                    while (reader.Read())
                    {
                        books.Add(NewBookFromReader(reader));
                    }

                    reader.Close();

                    return books;
                }
            }
        }

        public void AddBookClub(BookClub bookClub)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO BookClub (userId, bookId)
                    OUTPUT INSERTED.ID
                    VALUES (@userId, @bookId)";
                    cmd.Parameters.AddWithValue("@userId", bookClub.userId);
                    cmd.Parameters.AddWithValue("@bookId", bookClub.bookId);

                    bookClub.id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Add(Book book)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Books (
                           userId, title, currentPage, totalPage, genreId, authorId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @userId, @title, @currentPage, @totalPage, @genreId, @authorId )";
                    cmd.Parameters.AddWithValue("@userId", book.userId);
                    cmd.Parameters.AddWithValue("@title", book.title);
                    cmd.Parameters.AddWithValue("@currentPage", book.currentPage);
                    cmd.Parameters.AddWithValue("@totalPage", book.totalPage);
                    cmd.Parameters.AddWithValue("@genreId", book.genreId);
                    cmd.Parameters.AddWithValue("@authorId", book.authorId);

                    book.id = (int)cmd.ExecuteScalar();

                    BookClub bookClub = new BookClub();

                    bookClub.userId = book.userId;
                    bookClub.bookId = book.id;


                    AddBookClub(bookClub);

                }
            }
        }



        public void EditBook(Book book)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         UPDATE Books
                            SET 
                                [userId] = @userId,
                                title = @title,
                                currentPage = @currentPage,
                                totalPage = @totalPage,
                                genreId = @genreId,
                                authorId = @authorId
                            WHERE id = @id";

                    cmd.Parameters.AddWithValue("@id", book.id);
                    cmd.Parameters.AddWithValue("@userId", book.userId);
                    cmd.Parameters.AddWithValue("@title", book.title);
                    cmd.Parameters.AddWithValue("@currentPage", book.currentPage);
                    cmd.Parameters.AddWithValue("@totalPage", book.totalPage);
                    cmd.Parameters.AddWithValue("@genreId", book.genreId);
                    cmd.Parameters.AddWithValue("@authorId", book.authorId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteBook(int bookId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE from bookClub
                            WHERE bookId = @id
                            DELETE FROM Books
                            WHERE id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", bookId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Book NewBookFromReader(SqlDataReader reader)
        {
            return new Book()
            {
                id = reader.GetInt32(reader.GetOrdinal("id")),
                title = reader.GetString(reader.GetOrdinal("title")),
                currentPage = reader.GetInt32(reader.GetOrdinal("currentPage")),
                totalPage = reader.GetInt32(reader.GetOrdinal("totalPage")),
                authorId = reader.GetInt32(reader.GetOrdinal("authorId")),
                Author = new Author()
                {
                    id = reader.GetInt32(reader.GetOrdinal("Author Id")),
                    name = reader.GetString(reader.GetOrdinal("Author Name"))
                },
                genreId = reader.GetInt32(reader.GetOrdinal("genreId")),
                Genre = new Genre()
                {
                    id = reader.GetInt32(reader.GetOrdinal("Genre Id")),
                    name = reader.GetString(reader.GetOrdinal("Genre Name"))
                },
                userId = reader.GetInt32(reader.GetOrdinal("userId")),
                User = new User()
                {
                    id = reader.GetInt32(reader.GetOrdinal("User Id")),
                    firstName = DbUtils.GetString(reader, "firstName"),
                    lastName = DbUtils.GetString(reader, "lastName"),
                    userName = DbUtils.GetString(reader, "userName"),
                    password = DbUtils.GetString(reader, "password"),
                    imageUrl = DbUtils.GetString(reader, "imageUrl"),
                }
            };
        }


    }
}
