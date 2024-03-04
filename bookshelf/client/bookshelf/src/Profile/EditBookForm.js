import React, { useState } from "react";
import { getAllAuthors, getAllGenres } from '../Managers/BookManager';
import { useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export function EditBookForm({ bookClub, setShowForm }) {

    const [editBookClub, setEditBookClub] = useState(bookClub)

    function refreshPage() {
        window.location.reload();
    }

    const handleControlledInputChange = (e) => {

        const newBookClubEntry = { ...editBookClub }

        newBookClubEntry[`${e.target.name}`] = e.target.value

        setEditBookClub(newBookClubEntry)
    }

    const UpdateEntry = (e) => {
        e.preventDefault()

        const entryToSend = {
            ...editBookClub,
        }

        fetch(`https://localhost:5001/api/BookClub/${editBookClub.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entryToSend),
        }).then(r => r.json)
            .then(() => setShowForm(false))
            .then(refreshPage)
    }


    return (
        <div className="card m-4" style={{ width: '18rem' }}>
            <div className="card-body text-center">
                <p>
                    Current Page
                    <Input name="currentPage" type="text" placeholder="" value={editBookClub.currentPage} onChange={handleControlledInputChange} />
                </p>
            </div>
            <button className="btn btn-success" onClick={(e) => UpdateEntry(e)}> Save </button>
            <button className="btn btn-info" onClick={() => setShowForm(null)}> Cancel </button>
        </div>
    )
}





{/* <p>
                    Title
                    <Input name="title" type="text" placeholder="" value={editBook.title} onChange={handleControlledInputChange} />
                </p>
                <p>
                    Author
                    <Input type="select" name="authorId" value={editBook.authorId} onChange={handleControlledInputChange} >

                        {authors.map(author => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </Input>
                </p>
                <p>
                    Genre
                    <Input type="select"
                        name="genreId"
                        value={editBook.genreId}
                        onChange={handleControlledInputChange}
                    >
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </Input>
                </p> */}

{/* <p>
                    Total Pages
                    <Input name="totalPage" type="text" placeholder="" value={editBook.totalPage} onChange={handleControlledInputChange} />
                </p> */}

                
    // const [authors, setAuthors] = useState([]);
    // const [genres, setGenres] = useState([]);

    // const getAuthors = () => {

    //     getAllAuthors().then(allInfo => setAuthors(allInfo));
    // };

    // useEffect(() => {
    //     getAuthors();
    // }, []);

    // const getGenres = () => {

    //     getAllGenres().then(allInfo => setGenres(allInfo));
    // };

    // useEffect(() => {
    //     getGenres();
    // }, []);
