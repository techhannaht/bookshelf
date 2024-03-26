import { BookCard } from "./BookCard"
import { EditBookForm } from "./EditBookForm"
import React, { useState } from "react";

export default function BookContainer({ setBook, bookClub, book, setCurrentlyReadingBook, CRbookClub, CRbook })
{

const [showForm, setShowForm] = useState(false)

return (
showForm ? <EditBookForm setBook={setBook} setShowForm={setShowForm} bookClub={bookClub} book={book}/>
: <BookCard  bookClub={bookClub} setShowForm={setShowForm} book={book} /> 
)

}