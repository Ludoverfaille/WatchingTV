using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WatchingTV.DAO;
using WatchingTV.Models;

namespace WatchingTV.Controllers
{
    public class UtilisateurController : ApiController
    {
        public List<Utilisateur> Get()
        {
            return UtilisateurDAO.Query();
        }

        public Utilisateur Get(int id)
        {
            return UtilisateurDAO.Get(id);
        }

        public Utilisateur Post(Utilisateur utilisateur)
        {
            return UtilisateurDAO.Create(utilisateur);
        }

        public IHttpActionResult Put(Utilisateur utilisateur)
        {
            if (UtilisateurDAO.Update(utilisateur))
            {
                return Ok();
            }

            return BadRequest();
        }

        public IHttpActionResult Delete(int id)
        {
            if (UtilisateurDAO.Delete(id))
            {
                return Ok();
            }
            return BadRequest();
        }
    }

}