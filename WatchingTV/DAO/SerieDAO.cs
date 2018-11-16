using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using WatchingTV.Models;

namespace WatchingTV.DAO
{
    public class SerieDAO
    {
        public static readonly string TABLE_NAME = "Serie";
        public static readonly string COLUMN_ID = "Id";
        public static readonly string COLUMN_TITLE = "Title";
        public static readonly string COLUMN_OVERVIEW = "Overview";
        public static readonly string COLUMN_SEASON = "Season";
        public static readonly string COLUMN_EPISODE = "Episode";
        public static readonly string COLUMN_STATUS = "Status";
        public static readonly string COLUMN_RELEASE_DATE = "ReleaseDate";
        public static readonly string COLUMN_VOTE_AVERAGE = "VoteAverage";
        public static readonly string COLUMN_POSTER_LINK = "PosterLink";

        public static readonly string QUERY = "SELECT * FROM " + TABLE_NAME;
        public static readonly string GET = QUERY + " WHERE " + COLUMN_ID + " = @id";
        public static readonly string CREATE = "INSERT INTO " + TABLE_NAME +
            "(" + COLUMN_TITLE + ", " + COLUMN_OVERVIEW + ", " + COLUMN_SEASON + ", " + COLUMN_EPISODE + ", " + COLUMN_STATUS + 
            ", " + COLUMN_RELEASE_DATE + ", " + COLUMN_VOTE_AVERAGE + ", " + COLUMN_POSTER_LINK +
            ") OUTPUT INSERTED." + COLUMN_ID +
            " VALUES(@title, @overview, @season, @episode, @status, @releaseDate, @voteAverage, @posterLink)";
        public static readonly string UPDATE = "UPDATE " + TABLE_NAME +
            " SET " + COLUMN_TITLE + " = @title, " + COLUMN_OVERVIEW + " = @overview, "
            + COLUMN_SEASON  + " = @season, " + COLUMN_EPISODE + " = @episode, " + COLUMN_STATUS + " = @status, "
            + COLUMN_RELEASE_DATE + " = @releaseDate, " + COLUMN_VOTE_AVERAGE + " = @voteAverage, "
            + COLUMN_POSTER_LINK + " = @posterLink WHERE " + COLUMN_ID + " = @id";
        public static readonly string DELETE = "DELETE FROM " + TABLE_NAME + " WHERE " + COLUMN_ID + " = @id";

        public static List<Serie> Query()
        {
            List<Serie> series = new List<Serie>();

            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(QUERY, connection);
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    series.Add(new Serie(reader));
                }
            }
            return series;
        }


        public static Serie Get(int id)
        {
            Serie serie = null;
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(GET, connection);
                command.Parameters.AddWithValue("@id", id);
                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    serie = new Serie(reader);
                }
            }
            return serie;
        }

        public static Serie Create(Serie serie)
        {
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();

                SqlCommand command = new SqlCommand(CREATE, connection);
                command.Parameters.AddWithValue("@title", serie.Title);
                command.Parameters.AddWithValue("@overview", serie.Overview);
                command.Parameters.AddWithValue("@season", serie.Season);
                command.Parameters.AddWithValue("@episode", serie.Episode);
                command.Parameters.AddWithValue("@status", serie.Status);
                command.Parameters.AddWithValue("@releaseDate", serie.ReleaseDate);
                command.Parameters.AddWithValue("@voteAverage", serie.VoteAverage);
                command.Parameters.AddWithValue("@posterLink", serie.PosterLink);
                serie.Id = (int)command.ExecuteScalar();
            }
            return serie;
        }

        public static bool Update(Serie serie)
        {
            bool hasBeenChanged = false;
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(UPDATE, connection);
                command.Parameters.AddWithValue("@title", serie.Title);
                command.Parameters.AddWithValue("@overview", serie.Overview);
                command.Parameters.AddWithValue("@season", serie.Season);
                command.Parameters.AddWithValue("@episode", serie.Episode);
                command.Parameters.AddWithValue("@status", serie.Status);
                command.Parameters.AddWithValue("@releaseDate", serie.ReleaseDate);
                command.Parameters.AddWithValue("@voteAverage", serie.VoteAverage);
                command.Parameters.AddWithValue("@posterLink", serie.PosterLink);
                command.Parameters.AddWithValue("@id", serie.Id);

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