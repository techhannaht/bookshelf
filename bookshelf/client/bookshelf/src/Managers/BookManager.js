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

