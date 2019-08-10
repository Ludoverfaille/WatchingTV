using Newtonsoft.Json;
using System;
using System.Data.SqlClient;
using WatchingTV.DAO;

namespace WatchingTV.Models
{
    public class Serie
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "idSerie")]
        public int IdSerie { get; set; }
        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "overview")]
        public string Overview { get; set; }
        [JsonProperty(PropertyName = "season")]
        public int Season { get; set; }
        [JsonProperty(PropertyName = "episode")]
        public int Episode { get; set; }
        [JsonProperty(PropertyName = "status")]
        public string Status { get; set; }
        [JsonProperty(PropertyName = "releaseDate")]
        public string ReleaseDate { get; set; }
        [JsonProperty(PropertyName = "voteAverage")]
        public float VoteAverage { get; set; }
        [JsonProperty(PropertyName = "posterLink")]
        public string PosterLink { get; set; }

        public Serie(SqlDataReader reader)
        {
            Id = Int32.Parse(reader[SerieDAO.COLUMN_ID].ToString());
            IdSerie = Int32.Parse(reader[SerieDAO.COLUMN_IDSERIE].ToString());
            Title = reader[SerieDAO.COLUMN_TITLE].ToString();
            Overview = reader[SerieDAO.COLUMN_OVERVIEW].ToString();
            Season = Int32.Parse(reader[SerieDAO.COLUMN_SEASON].ToString());
            Episode = Int32.Parse(reader[SerieDAO.COLUMN_EPISODE].ToString());
            Status = reader[SerieDAO.COLUMN_STATUS].ToString();
            ReleaseDate = reader[SerieDAO.COLUMN_RELEASE_DATE].ToString();
            VoteAverage = float.Parse(reader[SerieDAO.COLUMN_VOTE_AVERAGE].ToString());
            PosterLink = reader[SerieDAO.COLUMN_POSTER_LINK].ToString();
        }

        public Serie()
        {

        }

    }

}