using Newtonsoft.Json;
using System;
using System.Data.SqlClient;
using WatchingTV.DAO;

namespace WatchingTV.Models
{
    public class Film
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "idFilm")]
        public int IdFilm { get; set; }
        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "overview")]
        public string Overview { get; set; }
        [JsonProperty(PropertyName = "releaseDate")]
        public string ReleaseDate { get; set; }
        [JsonProperty(PropertyName = "voteAverage")]
        public float VoteAverage { get; set; }
        [JsonProperty(PropertyName = "posterLink")]
        public string PosterLink { get; set; }

        public Film(SqlDataReader reader)
        {
            Id = Int32.Parse(reader[FilmDAO.COLUMN_ID].ToString());
            IdFilm = Int32.Parse(reader[FilmDAO.COLUMN_IDFILM].ToString());
            Title = reader[FilmDAO.COLUMN_TITLE].ToString();
            Overview = reader[FilmDAO.COLUMN_OVERVIEW].ToString();
            ReleaseDate = reader[FilmDAO.COLUMN_RELEASE_DATE].ToString();
            VoteAverage = float.Parse(reader[FilmDAO.COLUMN_VOTE_AVERAGE].ToString());
            PosterLink = reader[FilmDAO.COLUMN_POSTER_LINK].ToString();
        }

        public Film()
        {

        }

    }

}