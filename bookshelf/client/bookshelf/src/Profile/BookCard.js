import { deleteBook } from "../Managers/BookManager";
import { Progress, Button} from "reactstrap";
import { Trash, Pencil } from 'react-bootstrap-icons';



export function BookCard({bookClub, book, setShowForm}) {
 
    function refreshPage() {
    window.location.reload();
  }
    return (
        <>
                    <div className="row">
                            <div className="card m-4" style={{ width: '18rem' }} key={book?.id}>
                                  <div className="card-body text-center">
                                    <div>
                                        <label className="font-weight-bold" style={{ fontSize: '1.2em' }} ><b>{book?.title}</b></label>
                                    </div>
                                    <div>
                                        <label className="font-weight-bold"><i>{book?.author}</i></label>
                                    </div>
                                    <div>
                                        <label className="font-weight-bold"><i>{book?.genre}</i></label>
                                    </div>
                                    <div>
                                        <Progress
                                            animated
                                            color="primary"
                                            striped
                                            max={book?.totalPage}
                                            value={bookClub.currentPage}
                                        />
                                        <p> on page {bookClub.currentPage} of {book?.totalPage} </p>
                                    </div>
                                    <Button color="primary" aria-label="edit" onClick={() => setShowForm(bookClub.id)}>
                                    <Pencil/>
                                </Button>
                                {/* Refactor to delete bookClub rather than book */}
                                {/* <Button color="danger" onClick={() => {deleteBook(book?.id); refreshPage(); }}>
                                <Trash/>
                                </Button> */}
                                </div>
                            </div>
                    </div>
                </>
    )
}