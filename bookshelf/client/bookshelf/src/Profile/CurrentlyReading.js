import React, { useState, useEffect } from "react";
import { getAllBookClubsByUser } from "../Managers/BookClubManager"; // Adjust this import based on your actual API implementation
import { Progress } from "reactstrap";
import { CRCard } from "./CRCard";
import { useParams } from "react-router-dom";

export function CurrentlyReading({ user }) {

    const [books, setBook] = useState([]);

    // Get books from database from user 
    const getBooks = () => {
        if (user.id) {
            getAllBookClubsByUser(user.id).then(allInfo => setBook(allInfo));
        }
    };

    useEffect(() => {
        getBooks();
    }, [user]);

    return (
        <>
            <h1 className="text-center"><i>{user.firstName}'s Library </i></h1>
            <div className="book-container" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {books.map((bookClubObj) => (
                    <CRCard bookClub={bookClubObj} book={bookClubObj?.book} />
                ))}
            </div>
        </>
    );
}

