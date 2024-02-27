import React, { useState, useEffect } from "react";
import { getAllBooksByLoggedInUser } from "../Managers/BookManager";
import { Progress } from "reactstrap";

export function MyCurrentlyReading() {

    const [books, setBook] = useState([]);

    const getBooks = () => {
        const localBookshelfUser = localStorage.getItem("userProfile");
        const bookshelfUserObject = JSON.parse(localBookshelfUser);

        getAllBooksByLoggedInUser(bookshelfUserObject.id).then(allInfo => setBook(allInfo));
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
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
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}