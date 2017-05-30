using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NvslOnlineCoreWebApi.Models;

namespace NvslOnlineCoreWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Contacts")]
    public class ContactsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ContactsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Contacts
        [HttpGet]
        public IEnumerable<Contacts> Getcontacts()
        {
            return _context.contacts;
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContacts([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Contacts contacts = await _context.contacts.SingleOrDefaultAsync(m => m.Id == id);

            if (contacts == null)
            {
                return NotFound();
            }

            return Ok(contacts);
        }

        // PUT: api/Contacts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContacts([FromRoute] int id, [FromBody] Contacts contacts)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contacts.Id)
            {
                return BadRequest();
            }

            _context.Entry(contacts).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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

            return NoContent();
        }

        // POST: api/Contacts
        [HttpPost]
        public async Task<IActionResult> PostContacts([FromBody] Contacts contacts)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.contacts.Add(contacts);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ContactsExists(contacts.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetContacts", new { id = contacts.Id }, contacts);
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContacts([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Contacts contacts = await _context.contacts.SingleOrDefaultAsync(m => m.Id == id);
            if (contacts == null)
            {
                return NotFound();
            }

            _context.contacts.Remove(contacts);
            await _context.SaveChangesAsync();

            return Ok(contacts);
        }

        private bool ContactsExists(int id)
        {
            return _context.contacts.Any(e => e.Id == id);
        }
    }
}
