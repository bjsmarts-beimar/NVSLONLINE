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
    [Route("api/Divisions")]
    public class DivisionsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DivisionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Divisions
        [HttpGet]
        public IEnumerable<Division> Getdivisions()
        {
            return _context.divisions;
        }

        // GET: api/Divisions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDivision([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Division division = await _context.divisions.SingleOrDefaultAsync(m => m.Id == id);

            if (division == null)
            {
                return NotFound();
            }

            return Ok(division);
        }

        // PUT: api/Divisions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDivision([FromRoute] int id, [FromBody] Division division)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != division.Id)
            {
                return BadRequest();
            }

            _context.Entry(division).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DivisionExists(id))
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

        // POST: api/Divisions
        [HttpPost]
        public async Task<IActionResult> PostDivision([FromBody] Division division)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.divisions.Add(division);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DivisionExists(division.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDivision", new { id = division.Id }, division);
        }

        // DELETE: api/Divisions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDivision([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Division division = await _context.divisions.SingleOrDefaultAsync(m => m.Id == id);
            if (division == null)
            {
                return NotFound();
            }

            _context.divisions.Remove(division);
            await _context.SaveChangesAsync();

            return Ok(division);
        }

        private bool DivisionExists(int id)
        {
            return _context.divisions.Any(e => e.Id == id);
        }
    }
}
