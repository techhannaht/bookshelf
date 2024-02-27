const apiUrl = "https://localhost:5001";

const localBookshelfUser = localStorage.getItem("userProfile");
const bookshelfUserObject = JSON.parse(localBookshelfUser);

// fetch all books clubs by user
export const getAllBookClubsByUser = () => {
    return fetch(`${apiUrl}/api/BookClub/${bookshelfUserObject.id}`)
        .then((r) => r.json());
};
