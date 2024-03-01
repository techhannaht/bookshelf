import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import { addBook } from '../Managers/BookManager';
import { Link } from 'react-router-dom';
import { getAllAuthors, getAllGenres } from '../Managers/BookManager';
import { getAllBooks } from '../Managers/BookManager';

export const BookForm = () => {
    const localBookshelfUser = localStorage.getItem("userProfile");
    const bookshelfUserObject = JSON.parse(localBookshelfUser);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [search, setSearch] = useState( "");
    const [bookEntry, setBookEntry] = useState({
        title: "",
        currentPage: "",
        totalPage: "",
        userId: bookshelfUserObject.id,
        genreId: "",
        authorId: "",
    })

    const getAuthors = () => {

       return getAllAuthors().then(allInfo => setAuthors(allInfo));
    };

    useEffect(() => {
        getAuthors()
        .then(getGenres)
        .then(getAllBooks)
        .then(allBooks => setBooks(allBooks))
        ;
    }, []);

    const getGenres = () => {

       return getAllGenres().then(allInfo => setGenres(allInfo));
    };

    useEffect(() => {
        let filteredSearch 
        search? 
         filteredSearch = books.filter(x => x.title.toLowerCase().includes(search.toLowerCase()))
        :
        filteredSearch = []

        setFilteredBooks(filteredSearch)
    }, [search]);


    const handleControlledInputChange = (e) => {

        const newBookEntry = { ...bookEntry }

        newBookEntry[`${e.target.name}`] = e.target.value

        setBookEntry(newBookEntry)
    }
    const handleControlledInputChangeSearch = (e) => setSearch(e.target.value)
    


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
        <>
   <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
                type="text"
                name="search"
                value={search}
                onChange={handleControlledInputChangeSearch}
                placeholder="Search books..."
            />
            
            
        </div>
        <div>
         <Card>
         {filteredBooks.map((book) => (
             <div key={book.id}>
                {book.title}
             </div>
         ))}
     </Card>
     </div>


        <Form onSubmit={saveEntry}>
            <fieldset>
                <FormGroup>
                    <Label htmlFor="Title">Title</Label>
                    <Input id="title" name="title" type="text" value={bookEntry.title} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="Author">Author</Label>
                    <Input type="select" name="authorId" id="authorId" value={bookEntry.authorId} onChange={handleControlledInputChange}>
                    <option value="">Select Author</option>
                        {authors.map(author => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="Genre">Genre</Label>
                    <Input type="select" name="genreId" id="genreId" value={bookEntry.genreId} onChange={handleControlledInputChange}>
                    <option value="">Select Genre</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
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

        </>                   
    )
}

export default BookForm;