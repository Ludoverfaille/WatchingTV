using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using WatchingTV.Models;

namespace WatchingTV.DAO
{
    public class FilmDAO
    {
        public static readonly string TABLE_NAME = "Film";
        public static readonly string COLUMN_ID = "Id";
        public static readonly string COLUMN_TITLE = "Title";
        public static readonly string COLUMN_OVERVIEW = "Overview";
        public static readonly string COLUMN_RELEASE_DATE = "ReleaseDate";
        public static readonly string COLUMN_VOTE_AVERAGE = "VoteAverage";
        public static readonly string COLUMN_POSTER_LINK = "PosterLink";

        public static readonly string QUERY = "SELECT * FROM " + TABLE_NAME;
        public static readonly string GET = QUERY + " WHERE " + COLUMN_ID + " = @id";
        public static readonly string CREATE = "INSERT INTO " + TABLE_NAME +
            "(" + COLUMN_TITLE + ", " + COLUMN_OVERVIEW +
            ", " + COLUMN_RELEASE_DATE + ", " + COLUMN_VOTE_AVERAGE + ", " + COLUMN_POSTER_LINK +
            ") OUTPUT INSERTED." + COLUMN_ID + 
            " VALUES(@title, @overview, @releaseDate, @voteAverage, @posterLink)";
        public static readonly string UPDATE = "UPDATE " + TABLE_NAME +
            " SET " + COLUMN_TITLE + " = @title, " + COLUMN_OVERVIEW + " = @overview, "
            + COLUMN_RELEASE_DATE + " = @releaseDate, " + COLUMN_VOTE_AVERAGE + " = @voteAverage, "
            + COLUMN_POSTER_LINK + " = @posterLink WHERE " + COLUMN_ID + " = @id";
        public static readonly string DELETE = "DELETE FROM " + TABLE_NAME + " WHERE " + COLUMN_ID + " = @id";

        public static List<Film> Query()
        {
            List<Film> films = new List<Film>();

            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(QUERY, connection);
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    films.Add(new Film(reader));
                }
            }
            return films;
        }

        
        public static Film Get(int id)
        {
            Film film = null;
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(GET, connection);
                command.Parameters.AddWithValue("@id", id);
                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    film = new Film(reader);
                }
            }
            return film;
        }

        public static Film Create(Film film)
        {
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();

                SqlCommand command = new SqlCommand(CREATE, connection);
                command.Parameters.AddWithValue("@title", film.Title);
                command.Parameters.AddWithValue("@overview", film.Overview);
                command.Parameters.AddWithValue("@releaseDate", film.ReleaseDate);
                command.Parameters.AddWithValue("@voteAverage", film.VoteAverage);
                command.Parameters.AddWithValue("@posterLink", film.PosterLink);
                film.Id = (int)command.ExecuteScalar();
            }
            return film;
        }

        public static bool Update(Film film)
        {
            bool hasBeenChanged = false;
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(UPDATE, connection);
                command.Parameters.AddWithValue("@title", film.Title);
                command.Parameters.AddWithValue("@overview", film.Overview);
                command.Parameters.AddWithValue("@releaseDate", film.ReleaseDate);
                command.Parameters.AddWithValue("@voteAverage", film.VoteAverage);
                command.Parameters.AddWithValue("@posterLink", film.PosterLink);

                hasBeenChanged = command.ExecuteNonQuery() != 0;
            }
            return hasBeenChanged;
        }

        public static bool Delete(int id)
        {
            bool hasBeenChanged = false;
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(DELETE, connection);
                command.Parameters.AddWithValue("@id", id);

                hasBeenChanged = command.ExecuteNonQuery() != 0;
            }
            return hasBeenChanged;
        }


    }
}