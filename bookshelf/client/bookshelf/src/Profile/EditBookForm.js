import React, { useState } from "react";

export function EditBookForm({book, setShowForm}) {

    const [editBook, setEditBook] = useState(book)

    function refreshPage() {
    window.location.reload();
  }

    const handleControlledInputChange = (e) => {

        const newBookEntry = { ...editBook }

        newBookEntry[`${e.target.name}`] = e.target.value

        setEditBook(newBookEntry)
    }

    const UpdateEntry = (e) => {
        e.preventDefault()

        const entryToSend = {
            ...editBook,
            IsApproved: true
        }


        fetch(`https://localhost:5001/api/Book/${editBook.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entryToSend),
        }).then(r => r.json)
            // .then(updateBookState)
            .then(() => setShowForm(false))
            .then(refreshPage)
    }


return (
<div className="card m-4" style={{ width: '18rem' }}>
                    <div className="card-body text-center">
                        <p>
                            <input name="title" type="text" placeholder="" value={editBook.title} onChange={handleControlledInputChange} />
                        </p>
                        <p>
                            <input name="authorId" type="text" placeholder="" value={editBook.authorId} onChange={handleControlledInputChange} />
                        </p>
                        <p>
                            <input name="genreId" type="text" placeholder="" value={editBook.genreId} onChange={handleControlledInputChange} />
                        </p>
                    </div>
                    <button className="btn btn-success" onClick={(e) => UpdateEntry(e)}> Save </button>
                    <button className="btn btn-info" onClick={() => setShowForm(null)}> Cancel </button>
                </div>
)
}