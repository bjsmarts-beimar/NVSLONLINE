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
    [Route("api/Venues")]
    public class VenuesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public VenuesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Venues
        [HttpGet]
        public IEnumerable<Venue> Getvenue()
        {
            return _context.venue;
        }

        // GET: api/Venues/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVenue([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Venue venue = await _context.venue.SingleOrDefaultAsync(m => m.Id == id);

            if (venue == null)
            {
                return NotFound();
            }

            return Ok(venue);
        }

        // PUT: api/Venues/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVenue([FromRoute] int id, [FromBody] Venue venue)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != venue.Id)
            {
                return BadRequest();
            }

            _context.Entry(venue).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VenueExists(id))
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

        // POST: api/Venues
        [HttpPost]
        public async Task<IActionResult> PostVenue([FromBody] Venue venue)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.venue.Add(venue);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (VenueExists(venue.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetVenue", new { id = venue.Id }, venue);
        }

        // DELETE: api/Venues/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVenue([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Venue venue = await _context.venue.SingleOrDefaultAsync(m => m.Id == id);
            if (venue == null)
            {
                return NotFound();
            }

            _context.venue.Remove(venue);
            await _context.SaveChangesAsync();

            return Ok(venue);
        }

        private bool VenueExists(int id)
        {
            return _context.venue.Any(e => e.Id == id);
        }
    }
}
