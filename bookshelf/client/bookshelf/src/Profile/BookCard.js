import { deleteBook } from "../Managers/BookManager";
import { Progress } from "reactstrap";


export function BookCard({book, setShowForm}) {
 
    function refreshPage() {
    window.location.reload();
  }
    return (
        <>
                    <div className="row">
                            <div className="card m-4" style={{ width: '18rem' }} key={book.id}>
                                  <div className="card-body text-center">
                                    <div>
                                        <label className="font-weight-bold" style={{ fontSize: '1.2em' }} ><b>{book.title}</b></label>
                                    </div>
                                    <div>
                                        <label className="font-weight-bold"><i>{book.author.name}</i></label>
                                    </div>
                                    <div>
                                        <label className="font-weight-bold"><i>{book.genre.name}</i></label>
                                    </div>
                                    <div>
                                        <Progress
                                            animated
                                            color="info"
                                            striped
                                            max={book.totalPage}
                                            value={book.currentPage}
                                        />
                                        <p> on page {book.currentPage} of {book.totalPage} </p>
                                    </div>
                                    <button className="btn btn-warning" aria-label="edit" onClick={() => setShowForm(book.id)}>
                                    Edit
                                </button>
                                {/* <button className="btn btn-danger" onClick={() => {deleteBook(book.id, updateBookState); refreshPage(); }}>
                                    Delete
                                </button> */}
                                </div>
                            </div>
                    </div>
                </>
    )
}