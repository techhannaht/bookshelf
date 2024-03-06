const apiUrl = "https://localhost:5001";

const localBookshelfUser = localStorage.getItem("userProfile");
const bookshelfUserObject = JSON.parse(localBookshelfUser);

// fetch all books clubs by user
export const getAllBookClubsByLoggedInUser = () => {
    return fetch(`${apiUrl}/api/BookClub/${bookshelfUserObject.id}`)
        .then((r) => r.json());
};

// fetch all books clubs by user
export const getAllBookClubsByUser = (id) => {
    return fetch(`${apiUrl}/api/BookClub/${id}`)
        .then((r) => r.json());
};

export const deleteBookClub = (id) => {
    return fetch(`https://localhost:5001/api/BookClub/${id}`, { method: "DELETE" })
  }

