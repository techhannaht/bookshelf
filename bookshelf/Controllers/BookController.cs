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

    }
}
