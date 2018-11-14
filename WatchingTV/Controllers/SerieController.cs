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
    public class SerieController : ApiController
    {
        public List<Serie> Get()
        {
            return SerieDAO.Query();
        }


        public Serie Get(int id)
        {
            return SerieDAO.Get(id);
        }

        public Serie Post(Serie serie)
        {
            return SerieDAO.Create(serie);
        }

        public IHttpActionResult Put(Serie serie)
        {
            if (SerieDAO.Update(serie))
            {
                return Ok();
            }

            return BadRequest();
        }

        public IHttpActionResult Delete(int id)
        {
            if (SerieDAO.Delete(id))
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}