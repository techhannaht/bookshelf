using bookshelf.Models;
using bookshelf.Utils;
using Microsoft.Data.SqlClient;

namespace bookshelf.Repositories
{
    public class MessageRepository : BaseRepository, IMessageRepository
    {
        public MessageRepository(IConfiguration configuration) : base(configuration) { }

        public List<Message> GetAllMessagesByBookClub(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT m.id, m.userId, m.bookClubId, m.content, m.sendDateTime, u.id AS ""User Id"", u.userName, u.password, u.firstName, u.lastName, u.imageUrl
                         FROM Message m
                         LEFT JOIN [User] u ON m.userId = u.id
                         WHERE m.bookClubId = @id;
                       ";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    var messages = new List<Message>();

                    while (reader.Read())
                    {
                        messages.Add(NewMessageFromReader(reader));
                    }

                    reader.Close();

                    return messages;
                }
            }
        }

        public void AddMessage(Message message)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Message (userId, bookClubId, content, sendDateTime)
                    OUTPUT INSERTED.ID
                    VALUES (@userId, @bookClubId, @content, @sendDateTime)";
                    cmd.Parameters.AddWithValue("@userId", message.userId);
                    cmd.Parameters.AddWithValue("@bookClubId", message.bookClubId);
                    cmd.Parameters.AddWithValue("@content", message.content);
                    cmd.Parameters.AddWithValue("@sendDateTime", message.sendDateTime);

                    message.id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void DeleteMessage(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE from Message
                            WHERE id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        private Message NewMessageFromReader(SqlDataReader reader)
        {
            return new Message()
            {
                id = reader.GetInt32(reader.GetOrdinal("id")),
                userId = reader.GetInt32(reader.GetOrdinal("userId")),
                User = new User()
                {
                    id = reader.GetInt32(reader.GetOrdinal("User Id")),
                    firstName = DbUtils.GetString(reader, "firstName"),
                    lastName = DbUtils.GetString(reader, "lastName"),
                    userName = DbUtils.GetString(reader, "userName"),
                    password = DbUtils.GetString(reader, "password"),
                    imageUrl = DbUtils.GetString(reader, "imageUrl"),
                },
                bookClubId = reader.GetInt32(reader.GetOrdinal("bookClubId")),
                content = reader.GetString(reader.GetOrdinal("content"))
            };
        }

    }
}
