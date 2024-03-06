import { BookCard } from "./BookCard"
import { EditBookForm } from "./EditBookForm"
import React, { useState } from "react";

export default function BookContainer({  moveBookToCompleted, onUpdate, bookClub, book })
{

const [showForm, setShowForm] = useState(false)

return (
showForm ? <EditBookForm setShowForm={setShowForm} bookClub={bookClub} book={book}/>
: <BookCard bookClub={bookClub} setShowForm={setShowForm} book={book} /> 
)

}