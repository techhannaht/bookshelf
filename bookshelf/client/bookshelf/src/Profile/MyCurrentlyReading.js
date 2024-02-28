import React, { useState, useEffect } from "react";
import { deleteBook, getAllBooksByLoggedInUser } from "../Managers/BookManager";
import { Progress } from "reactstrap";

function refreshPage() {
    window.location.reload();
  }

export function MyCurrentlyReading( { updateBookState } ) {

    const [books, setBook] = useState([]);
    const [showForm, setShowForm] = useState(false)
    const [editBook, setEditBook] = useState({})


// Get books from database from logged in user 
    const getBooks = () => {
        const localBookshelfUser = localStorage.getItem("userProfile");
        const bookshelfUserObject = JSON.parse(localBookshelfUser);

        getAllBooksByLoggedInUser(bookshelfUserObject.id).then(allInfo => setBook(allInfo));
    };

    useEffect(() => {
        getBooks();
    }, []);


// Edit book functionality 
    useEffect(() => {
    setEditBook(books)
    }, [books]);
    
    const handleControlledInputChange = (e) => {

        const newBookEntry = { ...editBook }

        newBookEntry[`${e.target.name}`] = e.target.value

        setEditBook(newBookEntry)
    }

    const UpdateEntry = (e) => {
        e.preventDefault()

        const entryToSend = {
            ...editBook,
            IsApproved: true
        }


        fetch(`https://localhost:5001/api/Book/${editBook.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entryToSend),
        }).then(r => r.json)
            .then(updateBookState)
            .then(() => setShowForm(false))
            .then(refreshPage)
    }

    return (
        <>
            {!showForm ? (
                <>
                    <h1 className="text-left"><i>Currently Reading</i></h1>
                    <div className="row">
                        {books.map((book) => (
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
                                <button className="btn btn-danger" onClick={() => {deleteBook(book.id, updateBookState); refreshPage(); }}>
                                    Delete
                                </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="card m-4" style={{ width: '18rem' }}>
                    <div className="card-body text-center">
                        <p>
                            <input name="title" type="text" placeholder="" value={editBook.title} onChange={handleControlledInputChange} />
                        </p>
                        <p>
                            <input name="authorId" type="text" placeholder="" value={editBook.authorId} onChange={handleControlledInputChange} />
                        </p>
                        <p>
                            <input name="genreId" type="text" placeholder="" value={editBook.genreId} onChange={handleControlledInputChange} />
                        </p>
                    </div>
                    <button className="btn btn-success" onClick={(e) => UpdateEntry(e)}> Save </button>
                    <button className="btn btn-info" onClick={() => setShowForm(null)}> Cancel </button>
                </div>
            )}
        </>
    );
    
}    
