import { BookCard } from "./BookCard"
import { EditBookForm } from "./EditBookForm"
import React, { useState } from "react";

export default function BookContainer({ book })
{

const [showForm, setShowForm] = useState(false)

return (
showForm ? <EditBookForm  setShowForm={setShowForm} book={book}/>
: <BookCard setShowForm={setShowForm} book={book} /> 
)

}