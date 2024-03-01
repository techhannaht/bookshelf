import React, { useState, useEffect } from "react";
import { getAllBooksByUser } from "../Managers/BookManager"; // Adjust this import based on your actual API implementation
import { Progress } from "reactstrap";

export function CurrentlyReading({ userId }) {
    const [userBooks, setUserBooks] = useState([]);

    useEffect(() => {
        // Fetch books for the current user
        fetchCurrentUserBooks();
    }, []);

    const fetchCurrentUserBooks = async () => {
        try {
            // Fetch books for the current user from the backend
            const books = await getAllBooksByUser(userId);
            setUserBooks(books);
        } catch (error) {
            console.error("Error fetching user's books:", error);
        }
    };

    return (
        <>
            <h1 className="text-left"><i>Currently Reading</i></h1>
            <div className="row">
                {userBooks.map((book) => (
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
                                    color="primary"
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
    );
}

