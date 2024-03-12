import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import { addBook, addToBookClub } from '../Managers/BookManager';
import { Link } from 'react-router-dom';
import { getAllAuthors, getAllGenres } from '../Managers/BookManager';
import { getAllBooks } from '../Managers/BookManager';
import { getAllBookClubsByLoggedInUser } from '../Managers/BookClubManager';
import addLogo from '../Images/Add-logo.png';

export const BookClubRegistrationForm = () => {
    const navigate = useNavigate();
    const localBookshelfUser = localStorage.getItem("userProfile");
    const bookshelfUserObject = JSON.parse(localBookshelfUser);
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [bookEntry, setBookEntry] = useState({
        title: "",
        totalPage: "",
        userId: bookshelfUserObject.id,
        genre: "",
        author: "",
    })

    const [showForm, setShowForm] = useState(false); // State to manage form visibility

    const toggleForm = () => {
        setShowForm(!showForm);
    };


    useEffect(() => {
        getAllBooks()
            .then(allBooks => setBooks(allBooks))
            ;
    }, []);


    useEffect(() => {
        let filteredSearch
        search ?
            filteredSearch = books.filter(book =>  book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase()))
            :
            filteredSearch = []

        setFilteredBooks(filteredSearch)
    }, [search]);

    const handleControlledInputChangeSearch = (e) => setSearch(e.target.value)

    const handleControlledInputChange = (e) => {

        const newBookEntry = { ...bookEntry }

        newBookEntry[`${e.target.name}`] = e.target.value

        setBookEntry(newBookEntry)
    }

    const saveEntry = (e) => {
        e.preventDefault()

        const entryToSend = {
            ...bookEntry,
            userId: bookshelfUserObject.id,
        }

        entryToSend.totalPage = +entryToSend.totalPage

        addBook(entryToSend)
        .then(() => {
            return getAllBooks();
        })    
        .then(allInfo => {
            setBooks(allInfo);
        })
            .then(() => { 
                setBookEntry({
                title: "",
                totalPage: "",
                userId: bookshelfUserObject.id,
                genre: "",
                author: "",
            }
            )})
    }
 

    const addBookFromBookTableForBookClub = (book) => {

        getAllBookClubsByLoggedInUser()
        .then(userbooks => {
            if(!userbooks.some( x => x.bookId == book.id) ){
                const bookClub = {
                    userId: bookshelfUserObject.id,
                    bookId: book.id
                }
        
                addToBookClub(bookClub)
                .then(() => navigate("/"))

            }
            else {
                window.alert("You are already in this book club.")
            }

        })
 }


    return  (
        <>
         <div className="text-center mb-4" >
                <img src={addLogo} alt="Logo" style={{ width: '600px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
            <Card style={{ width: '100%', maxWidth: '1000px' }}>
                <div style={{ padding: '100px' }}>
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
                        {filteredBooks.length > 0 && (
                            <>
                                {filteredBooks.map(book => (
                                    <Card key={book.key}>
                                        <div>
                                            <h5>{book.title}</h5>
                                            <h5>{book.author}</h5>
                                            <Button onClick={() => addBookFromBookTableForBookClub(book)}>Select</Button>
                                        </div>
                                    </Card>
                                ))}
                            </>
                        )}
                    </div>
                    <i>Don't See Your Book?</i>
                    <Button color="primary" onClick={toggleForm}>
                        {showForm ? "Close Form" : "Add New Book"}
                    </Button>
                    <Link to="/">
                                        <Button color="warning">Back to Profile</Button>
                                    </Link>

                    {showForm && (
                        <Form onSubmit={saveEntry}>
                            <fieldset>
                                <FormGroup>
                                    <Label htmlFor="Title">Title</Label>
                                    <Input id="title" name="title" type="text" value={bookEntry.title} onChange={handleControlledInputChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Author">Author</Label>
                                    <Input type="text" name="author" id="author" value={bookEntry.author} onChange={handleControlledInputChange}>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Genre">Genre</Label>
                                    <Input type="text" name="genre" id="genre" value={bookEntry.genre} onChange={handleControlledInputChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="totalPage">Total Pages</Label>
                                    <Input id="totalPage" name="totalPage" type="text" value={bookEntry.totalPage} onChange={handleControlledInputChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Button color="primary" >Save Book</Button>
                                    <Link to="/">
                                        <Button color="warning">Back to Profile</Button>
                                    </Link>
                                </FormGroup>
                            </fieldset>
                        </Form>
                    )}
                </div>
            </Card>
        </div>
        </>
    );
}

export default BookClubRegistrationForm;


 // useEffect(() => {
    //     if (searchTermBook.trim() !== '') {
    //         fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchTermBook)}`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (data.docs) {
    //                     setSearchResults(data.docs);
    //                 } else {
    //                     setSearchResults([]);
    //                 }
    //             })
    //     } else {
    //         setSearchResults([]);
    //     }
    // }, [searchTermBook]);


    // const handleSearchInputChange = (e) => {
    //     setSearchTermBook(e.target.value);
    // };

    // const getAuthors = () => {

    //     return getAllAuthors().then(allInfo => setAuthors(allInfo));
    // };

      // const handleBookSelection = (selectedBook) => {
    //     setBookEntry({
    //         ...bookEntry,
    //         title: selectedBook.title,
    //     });
    //     setSearchResults("");
    // };

    // // Function to handle changes in the title input field
    // const handleTitleInputChange = (event) => {
    //     setTitleInput(event.target.value);
    // };
    // // Filtered search results based on the title input
    // const filteredSearchResults = searchResults.filter(book => {
    //     return book.title.toLowerCase().includes(titleInput.toLowerCase());
    // });

    
    // const getGenres = () => {

    //     return getAllGenres().then(allInfo => setGenres(allInfo));
    // };
