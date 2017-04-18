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
    public class ContactsController : ApiController
    {
        private NVSLOnlineDataContext db = new NVSLOnlineDataContext();

        // GET: api/Contacts
        public IQueryable<Contacts> GetContacts()
        {
            return db.Contacts;
        }

        // GET: api/Contacts/5
        [ResponseType(typeof(Contacts))]
        public IHttpActionResult GetContacts(int id)
        {
            Contacts contacts = db.Contacts.Find(id);
            if (contacts == null)
            {
                return NotFound();
            }

            return Ok(contacts);
        }

        // PUT: api/Contacts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutContacts(int id, Contacts contacts)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contacts.Id)
            {
                return BadRequest();
            }

            db.Entry(contacts).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactsExists(id))
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

        // POST: api/Contacts
        [ResponseType(typeof(Contacts))]
        public IHttpActionResult PostContacts(Contacts contacts)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Contacts.Add(contacts);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = contacts.Id }, contacts);
        }

        // DELETE: api/Contacts/5
        [ResponseType(typeof(Contacts))]
        public IHttpActionResult DeleteContacts(int id)
        {
            Contacts contacts = db.Contacts.Find(id);
            if (contacts == null)
            {
                return NotFound();
            }

            db.Contacts.Remove(contacts);
            db.SaveChanges();

            return Ok(contacts);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContactsExists(int id)
        {
            return db.Contacts.Count(e => e.Id == id) > 0;
        }
    }
}