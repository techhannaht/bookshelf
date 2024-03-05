import React, { useState, useEffect } from "react";
import { deleteBook, getAllBooksByLoggedInUser } from "../Managers/BookManager";
import { Progress } from "reactstrap";
import BookContainer from "./BookContainer";
import './BookCard.css';
import { getAllBookClubsByLoggedInUser } from "../Managers/BookClubManager";

function refreshPage() {
    window.location.reload();
  }

export function MyCurrentlyReading( { updateBookState } ) {

    const [books, setBook] = useState([]);
    
// Get books from database from logged in user 
    const getBooks = () => {
        const localBookshelfUser = localStorage.getItem("userProfile");
        const bookshelfUserObject = JSON.parse(localBookshelfUser);

        getAllBookClubsByLoggedInUser().then(allInfo => setBook(allInfo));
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
                <>
                    <h1 className="text-center"><i>Currently Reading</i></h1>
                    <div  className="book-container" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {books.map((bookClubObj) => (
                            <BookContainer bookClub={bookClubObj} book={bookClubObj?.book}/>
                        ))}
                    </div>
                </>
    );
}    
