using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using nvslonlineApi.Models;

namespace nvslonlineApi.Controllers
{
    public class TeamsController : ApiController
    {
        private NVSLOnlineDataContext db = new NVSLOnlineDataContext();

        // GET: api/Teams
        public IQueryable<Teams> GetTeams()
        {

            var teams = db.Teams.Include(d => d.Division)
                .Include(s => s.Season);

            return teams;
        }

        // GET: api/Teams/5
        [ResponseType(typeof(Teams))]
        public IHttpActionResult GetTeams(int id)
        {            
            //Teams teams = db.Teams.Find(id);

            var teams = db.Teams.Include(d => d.Division)
                .Include(s => s.Season)
                .SingleOrDefault(x => x.Id == id);

            if (teams == null)
            {
                return NotFound();
            }

            return Ok(teams);
        }

        // PUT: api/Teams/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTeams(int id, Teams teams)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != teams.Id)
            {
                return BadRequest();
            }

            db.Entry(teams).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Teams
        [ResponseType(typeof(Teams))]
        public IHttpActionResult PostTeams(Teams teams)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Teams.Add(teams);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = teams.Id }, teams);
        }

        // DELETE: api/Teams/5
        [ResponseType(typeof(Teams))]
        public IHttpActionResult DeleteTeams(int id)
        {
            Teams teams = db.Teams.Find(id);
            if (teams == null)
            {
                return NotFound();
            }

            db.Teams.Remove(teams);
            db.SaveChanges();

            return Ok(teams);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TeamsExists(int id)
        {
            return db.Teams.Count(e => e.Id == id) > 0;
        }
    }
}