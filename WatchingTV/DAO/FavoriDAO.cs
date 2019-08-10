using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using WatchingTV.Models;

namespace WatchingTV.DAO
{
    public class FavoriDAO
    {
        public static readonly string TABLE_NAME = "Favori";
        public static readonly string COLUMN_ID = "Id";
        public static readonly string COLUMN_IDAPI = "IdAPI";
        public static readonly string COLUMN_ELEMENT = "Element";
        public static readonly string COLUMN_ELEMENTTYPE = "ElementType";
        public static readonly string COLUMN_UTILISATEUR = "Utilisateur";

        public static readonly string QUERY = "SELECT * FROM " + TABLE_NAME;
        public static readonly string GET = QUERY + " WHERE " + COLUMN_ID + " = @id";
        public static readonly string CREATE = "INSERT INTO " + TABLE_NAME
            + "(" + COLUMN_IDAPI + ", " + COLUMN_ELEMENT + ", " + COLUMN_ELEMENTTYPE + ", " + COLUMN_UTILISATEUR + ") OUTPUT INSERTED."
            + COLUMN_ID + " VALUES(@idAPI,@element, @elementType, @utilisateur)";
        public static readonly string UPDATE = $"UPDATE {TABLE_NAME} SET {COLUMN_IDAPI} = @idAPI,{COLUMN_ELEMENT} = @element, {COLUMN_ELEMENTTYPE} = @elementType, {COLUMN_UTILISATEUR} = @utilisateur WHERE {COLUMN_ID} = @id";
        public static readonly string DELETE = $"DELETE FROM {TABLE_NAME} WHERE {COLUMN_ID} = @id";

        public static List<Favori> Query()
        {
            List<Favori> favoris = new List<Favori>();

            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(QUERY, connection);
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    favoris.Add(new Favori(reader));
                }
            }
            return favoris;
        }

        public static Favori Get(int id)
        {
            Favori favoris = null;
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(GET, connection);
                command.Parameters.AddWithValue("@id", id);
                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    favoris = new Favori(reader);
                }
            }
            return favoris;
        }

        public static Favori Create(Favori favori)
        {
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();

                SqlCommand command = new SqlCommand(CREATE, connection);
                command.Parameters.AddWithValue("@idAPI", favori.IdAPI);
                command.Parameters.AddWithValue("@element", favori.Element);
                command.Parameters.AddWithValue("@elementType", favori.ElementType);
                command.Parameters.AddWithValue("@utilisateur", favori.Utilisateur);
                favori.Id = (int)command.ExecuteScalar();
            }
            return favori;
        }

        public static bool Update(Favori favori)
        {
            bool hasBeenChanged = false;
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(UPDATE, connection);
                command.Parameters.AddWithValue("@idAPI", favori.IdAPI);
                command.Parameters.AddWithValue("@element", favori.Element);
                command.Parameters.AddWithValue("@elementType", favori.ElementType);
                command.Parameters.AddWithValue("@utilisateur", favori.Utilisateur);
                command.Parameters.AddWithValue("@id", favori.Id);

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