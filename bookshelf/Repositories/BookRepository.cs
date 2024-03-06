using bookshelf.Models;
using Microsoft.Data.SqlClient;

namespace bookshelf.Repositories
{
    public class BookRepository : BaseRepository, IBookRepository
    {

        public BookRepository(IConfiguration configuration) : base(configuration) { }
        //public List<Book> GetAllBooksByUser(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                            SELECT b.id, b.userId, b.title, b.currentPage, b.totalPage, b.genreId, b.authorId,a.id AS ""Author Id"", a.name AS ""Author Name"", g.id AS ""Genre Id"", g.name AS ""Genre Name"", 
        //                            u.id AS ""User Id"", u.firstName, u.lastName, u.userName, u.password, u.imageURL
        //                            FROM Books b
        //                            LEFT JOIN Author a ON b.authorId = a.id
        //                            LEFT JOIN Genre g ON b.genreId = g.id
        //                            LEFT JOIN [User] u ON b.userId = u.id
        //                            WHERE u.Id = @userId
        //               ";

        //            cmd.Parameters.AddWithValue("@userid", id);
        //            var reader = cmd.ExecuteReader();

        //            var books = new List<Book>();

        //            while (reader.Read())
        //            {
        //                books.Add(NewBookFromReader(reader));
        //            }

        //            reader.Close();

        //            return books;
        //        }
        //    }
        //}

        public List<Book> GetAllBooks()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT b.id, b.title, b.totalPage, b.genre, b.author 
                                    FROM Books b
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
                    INSERT INTO BookClub (userId, bookId, currentPage)
                    OUTPUT INSERTED.ID
                    VALUES (@userId, @bookId, @currentPage)";
                    cmd.Parameters.AddWithValue("@userId", bookClub.userId);
                    cmd.Parameters.AddWithValue("@bookId", bookClub.bookId);
                    cmd.Parameters.AddWithValue("@currentPage", bookClub.currentPage);

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
                           title, totalPage, genre, author )
                        OUTPUT INSERTED.ID
                        VALUES (
                           @title, @totalPage, @genre, @author )";

                    cmd.Parameters.AddWithValue("@title", book.title);
                    cmd.Parameters.AddWithValue("@totalPage", book.totalPage);
                    cmd.Parameters.AddWithValue("@genre", book.genre);
                    cmd.Parameters.AddWithValue("@author", book.author);

                    book.id = (int)cmd.ExecuteScalar();

                    //BookClub bookClub = new BookClub();

                    //bookClub.bookId = book.id;
                    //bookClub.userId = book.id;

                    //AddBookClub(bookClub);

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
                                title = @title,
                                totalPage = @totalPage,
                                genre = @genre,
                                author = @author
                            WHERE id = @id";

                    cmd.Parameters.AddWithValue("@id", book.id);
                    cmd.Parameters.AddWithValue("@title", book.title);
                    cmd.Parameters.AddWithValue("@totalPage", book.totalPage);
                    cmd.Parameters.AddWithValue("@genre", book.genre);
                    cmd.Parameters.AddWithValue("@author", book.author);

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
                            DELETE from Message
                            WHERE bookId = @id
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
                totalPage = reader.GetInt32(reader.GetOrdinal("totalPage")),
                author = reader.GetString(reader.GetOrdinal("author")),
                genre = reader.GetString(reader.GetOrdinal("genre")),
            };
        }


    }
}
