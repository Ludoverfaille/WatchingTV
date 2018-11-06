using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using WatchingTV.Models;

namespace WatchingTV.DAO
{
    public class UtilisateurDAO
    {
        public static readonly string TABLE_NAME = "Utilisateur";
        public static readonly string COLUMN_ID = "Id";
        public static readonly string COLUMN_USERNAME = "Username";
        public static readonly string COLUMN_IS_ADMIN = "IsAdmin";
        public static readonly string COLUMN_PASSWORD = "Password";

        public static readonly string QUERY = "SELECT * FROM " + TABLE_NAME;
        public static readonly string GET = QUERY + " WHERE " + COLUMN_ID + " = @id";
        public static readonly string CREATE = "INSERT INTO " + TABLE_NAME
            + "(" + COLUMN_USERNAME + ", " + COLUMN_IS_ADMIN + "," + COLUMN_PASSWORD + ") OUTPUT INSERTED."
            + COLUMN_ID + " VALUES(@username, 0, @password)";
        public static readonly string UPDATE = $"UPDATE {TABLE_NAME} SET {COLUMN_USERNAME} = @username, {COLUMN_IS_ADMIN} = @isAdmin, {COLUMN_PASSWORD} = @password WHERE {COLUMN_ID} = @id";
        public static readonly string DELETE = $"DELETE FROM {TABLE_NAME} WHERE {COLUMN_ID} = @id";

        public static List<Utilisateur> Query()
        {
            List<Utilisateur> utilisateurs = new List<Utilisateur>();

            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(QUERY, connection);
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    utilisateurs.Add(new Utilisateur(reader));
                }
            }
            return utilisateurs;
        }
        
        public static Utilisateur Get(int id)
        {
            Utilisateur utilisateur = null;
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(GET, connection);
                command.Parameters.AddWithValue("@id", id);
                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    utilisateur = new Utilisateur(reader);
                }
            }
            return utilisateur;
        }
        
        public static Utilisateur Create(Utilisateur utilisateur)
        {
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();

                SqlCommand command = new SqlCommand(CREATE, connection);
                command.Parameters.AddWithValue("@username", utilisateur.Username);
                command.Parameters.AddWithValue("@password", utilisateur.Password);
                utilisateur.Id = (int)command.ExecuteScalar();
            }
            return utilisateur;
        }

        public static bool Update(Utilisateur utilisateur)
        {
            bool hasBeenChanged = false;
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(UPDATE, connection);
                command.Parameters.AddWithValue("@username", utilisateur.Username);
                command.Parameters.AddWithValue("@isAdmin", utilisateur.IsAdmin);
                command.Parameters.AddWithValue("@password", utilisateur.Password);
                command.Parameters.AddWithValue("@id", utilisateur.Id);

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
