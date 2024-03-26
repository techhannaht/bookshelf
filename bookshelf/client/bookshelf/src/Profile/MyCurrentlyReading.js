import React, { useState, useEffect } from "react";
import { getAllCurrentlyReadingBookClubsByLoggedInUser, getAllFinishedBookClubsByLoggedInUser, getAllTBRBookClubsByLoggedInUser, getAllBookClubsByLoggedInUser } from "../Managers/BookClubManager";
import BookContainer from "./BookContainer";
import './BookCard.css';
import { useParams } from "react-router-dom";


export function MyCurrentlyReading() {

    // const [currentlyReadingBooks, setCurrentlyReadingBook] = useState([]);
    const [books, setBook] = useState([]);
    // const [TBRbooks, setTBRBook] = useState([]);
    // const [Finishedbooks, setFinishedBook] = useState([]);
    const { id } = useParams();
    const localBookshelfUser = localStorage.getItem("userProfile");
    const bookshelfUserObject = JSON.parse(localBookshelfUser);

    useEffect(() => {
        getAllBookClubsByLoggedInUser().then(allInfo => setBook(allInfo));
    }, [id]);

    // useEffect(() => {
    //     getAllCurrentlyReadingBookClubsByLoggedInUser().then(allCRInfo => setCurrentlyReadingBook(allCRInfo));
    // }, [id]);

    // useEffect(() => {
    //     getAllTBRBookClubsByLoggedInUser().then(allTBRInfo => setTBRBook(allTBRInfo));
    // }, [id]);

    // useEffect(() => {
    //     getAllFinishedBookClubsByLoggedInUser().then(allFinishedInfo => setFinishedBook(allFinishedInfo));
    // }, [id]);

    const tbrBooks = books.filter(bookClubObj => bookClubObj.stat === 1);
    const currentlyReadingBooks = books.filter(bookClubObj => bookClubObj.stat === 2);
    const finishedBooks = books.filter(bookClubObj => bookClubObj.stat === 3);

    return (
        <>
    <h1 className="text-center"><i> {bookshelfUserObject.firstName}'s Library</i></h1>
    <div className="book-container" style={{ display: 'flex', flexDirection: 'column' }}>
        {tbrBooks.length > 0 && (
            <div className="book-row">
                <h2>To Be Read</h2>
                <div className="book-card-container">
                    {tbrBooks.map((bookClubObj) => (
                        <div key={bookClubObj.id} className="book-card">
                            <BookContainer
                                setBooks={setBook}
                                bookClub={bookClubObj}
                                book={bookClubObj?.book}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )}

        {currentlyReadingBooks.length > 0 && (
            <div className="book-row">
                <h2>Currently Reading</h2>
                <div className="book-card-container">
                    {currentlyReadingBooks.map((bookClubObj) => (
                        <div key={bookClubObj.id} className="book-card">
                            <BookContainer
                                setBooks={setBook}
                                bookClub={bookClubObj}
                                book={bookClubObj?.book}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )}

        {finishedBooks.length > 0 && (
            <div className="book-row">
                <h2>Finished</h2>
                <div className="book-card-container">
                    {finishedBooks.map((bookClubObj) => (
                        <div key={bookClubObj.id} className="book-card">
                            <BookContainer
                                setBooks={setBook}
                                bookClub={bookClubObj}
                                book={bookClubObj?.book}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
</>
    );
}    
