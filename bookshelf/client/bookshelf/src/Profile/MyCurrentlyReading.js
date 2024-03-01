import React, { useState, useEffect } from "react";
import { deleteBook, getAllBooksByLoggedInUser } from "../Managers/BookManager";
import { Progress } from "reactstrap";
import BookContainer from "./BookContainer";
import './BookCard.css';

function refreshPage() {
    window.location.reload();
  }

export function MyCurrentlyReading( { updateBookState } ) {

    const [books, setBook] = useState([]);
    
// Get books from database from logged in user 
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
                    <div  className="book-container" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {books.map((book) => (
                            <BookContainer book={book}/>
                        ))}
                    </div>
                </>
    );
}    
