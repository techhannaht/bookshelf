using bookshelf.Models;
using bookshelf.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace bookshelf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        public BookController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet("{userId}")]
        public IActionResult GetAllBooksByUser(int userId)
        {

            return Ok(_bookRepository.GetAllBooksByUser(userId));
        }

        [HttpGet]
        public IActionResult GetAllBooks()
        {

            return Ok(_bookRepository.GetAllBooks());
        }

        [HttpPost]

        [HttpPost]
        public IActionResult Post(Book? book)
        {
            _bookRepository.Add(book);

            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Book book)
        {
            if (id != book.id)
            {
                return BadRequest();
            }

            _bookRepository.EditBook(book);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _bookRepository.DeleteBook(id);
            return NoContent();
        }


    }
}
