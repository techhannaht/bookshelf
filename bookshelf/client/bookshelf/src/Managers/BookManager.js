const apiUrl = "https://localhost:5001";

const localBookshelfUser = localStorage.getItem("userProfile");
const bookshelfUserObject = JSON.parse(localBookshelfUser);

// fetch all books by logged in user
export const getAllBooksByLoggedInUser = () => {
    return fetch(`${apiUrl}/api/Book/${bookshelfUserObject.id}`)
        .then((r) => r.json());
};

// fetch all books by other users
export const getAllBooksByUser = (id) => {
    return fetch(`${apiUrl}/api/Book/${id}`)
        .then((r) => r.json());
};

export const addBook = (singleBook) => {
    return fetch(`https://localhost:5001/api/Book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleBook),
    });
  };

  export const editBook = (book) => {
    return fetch(`https://localhost:5001/api/Book/${book.id}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });
};
  
  
  export const deleteBook = (id) => {
    return fetch(`https://localhost:5001/api/Book/${id}`, { method: "DELETE" })
  }

