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
    public class FavoriController : ApiController
    {
        public List<Favori> Get()
        {
            return FavoriDAO.Query();
        }

        public Favori Get(int id)
        {
            return FavoriDAO.Get(id);
        }

        public Favori Post(Favori favori)
        {
            return FavoriDAO.Create(favori);
        }

        public IHttpActionResult Put(Favori favori)
        {
            if (FavoriDAO.Update(favori))
            {
                return Ok();
            }

            return BadRequest();
        }

        public IHttpActionResult Delete(int id)
        {
            if (FavoriDAO.Delete(id))
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}