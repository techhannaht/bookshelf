import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { addBook } from '../Managers/BookManager';
import { Link } from 'react-router-dom';


export const BookForm = () => {

    const localBookshelfUser = localStorage.getItem("userProfile");
    const bookshelfUserObject = JSON.parse(localBookshelfUser);


    const [bookEntry, setBookEntry] = useState({
        title: "",
        currentPage: "",
        totalPage: "",
        userId: bookshelfUserObject.id,
        genreId: "",
        authorId: "",
    })

    const handleControlledInputChange = (e) => {

        const newBookEntry = { ...bookEntry }

        newBookEntry[`${e.target.name}`] = e.target.value

        setBookEntry(newBookEntry)
    }


    const updateBookState = () => {
        // Fetch the updated list of posts from the backend or update the existing state
        // Example: You can fetch the updated list of posts from the backend and set it as the new state
        fetch('/api/Book') // Assuming this endpoint retrieves all posts
            .then(response => response.json())
            .then(bookData => {
                // Update the component state with the new list of posts
                setBookEntry(bookData); // Assuming setPosts is your state update function
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    };

    const navigate = useNavigate();

    const saveEntry = (e) => {
        e.preventDefault()

        const entryToSend = {
            ...bookEntry,
            userId: bookshelfUserObject.id,
        }

        addBook(entryToSend)
            .then((p) => {
                p.json()
                    .then(x => {
                        navigate(`/`)
                    })
            }
            )

            .then(setBookEntry({
                title: "",
                currentPage: "",
                totalPage: "",
                userId: bookshelfUserObject.id,
                genreId: "",
                authorId: "",
            }))

            .catch(error => {
                console.error('Error adding post:', error);
                // Handle errors here, such as displaying an error message to the user
            });
    }

    return (
        <Form onSubmit={saveEntry}>
            <fieldset>
                <FormGroup>
                    <Label htmlFor="Title">Title</Label>
                    <Input id="title" name="title" type="text" value={bookEntry.title} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="Author">Author</Label>
                    <Input type="select" name="authorId" id="authorId" value={bookEntry.authorId} onChange={handleControlledInputChange}>
                        <option value="1">Sarah J. Maas</option>
                        <option value="2">Madeline Miller</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="Genre">Genre</Label>
                    <Input type="select" name="genreId" id="genreId" value={bookEntry.genreId} onChange={handleControlledInputChange}>
                        <option value="1">Fiction</option>
                        <option value="2">Non-Fiction</option>
                        <option value="3">Self-Help</option>
                        <option value="4">Myserty</option>
                        <option value="5">Adventure</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="currentPage">Current Page</Label>
                    <Input id="currentPage" name="currentPage" type="text" value={bookEntry.currentPage} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="totalPage">Total Pages</Label>
                    <Input id="totalPage" name="totalPage" type="text" value={bookEntry.totalPage} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Button>Save Post</Button>
                    <Link to="/">
                        <Button>Back to Profile</Button>
                    </Link>
                </FormGroup>
            </fieldset>
        </Form>


    )
}

export default BookForm;