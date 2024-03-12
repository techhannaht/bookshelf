import React, { useState, useEffect } from "react";
import { deleteBook, getAllBooksByLoggedInUser } from "../Managers/BookManager";
import { Progress } from "reactstrap";
import BookContainer from "./BookContainer";
import './BookCard.css';
import { getAllBookClubsByLoggedInUser } from "../Managers/BookClubManager";
import { useParams } from "react-router-dom";
import { updateBookClubState } from "../Managers/BookClubManager";

function refreshPage() {
    window.location.reload();
}

export function MyCurrentlyReading() {

    const [books, setBook] = useState([]);
    const { id } = useParams();
    const localBookshelfUser = localStorage.getItem("userProfile");
    const bookshelfUserObject = JSON.parse(localBookshelfUser);

    useEffect(() => {
        getAllBookClubsByLoggedInUser().then(allInfo => setBook(allInfo));
    }, [id]);

    return (
        <>
            <h1 className="text-center"><i> {bookshelfUserObject.firstName}'s Library</i></h1>
            <div className="book-container" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {books.map((bookClubObj) => (
                    <BookContainer setBook={setBook} bookClub={bookClubObj} book={bookClubObj?.book} />
                ))}
            </div>
        </>
    );
}    
