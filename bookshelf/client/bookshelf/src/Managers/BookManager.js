const apiUrl = "https://localhost:5001";

const localBookshelfUser = localStorage.getItem("userProfile");
const bookshelfUserObject = JSON.parse(localBookshelfUser);

// fetch all books by user
export const getAllBooksByUser = () => {
    return fetch(`${apiUrl}/api/Book/${bookshelfUserObject.id}`)
        .then((r) => r.json());
};

