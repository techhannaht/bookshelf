using bookshelf.Models;
using bookshelf.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace bookshelf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {

        private readonly IMessageRepository _messageRepository;

        public MessagesController(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;

        }

        [HttpGet]
        public IActionResult GetAllMessagesByBookClub(int bookClubId)
        {
            return Ok(_messageRepository.GetAllMessagesByBookClub(bookClubId));
        }


        [HttpPost]
        public IActionResult Post(Message? message)
        {
            _messageRepository.AddMessage(message);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _messageRepository.DeleteMessage(id);
            return NoContent();
        }

    }
}
