const apiUrl = "https://localhost:5001";

const localBookshelfUser = localStorage.getItem("userProfile");
const bookshelfUserObject = JSON.parse(localBookshelfUser);

// fetch all currently reading books clubs by user
export const getAllBookClubsByLoggedInUser = () => {
    return fetch(`${apiUrl}/api/BookClub/${bookshelfUserObject.id}`)
        .then((r) => r.json());
};

// fetch all currently reading books clubs by user
export const getAllCurrentlyReadingBookClubsByLoggedInUser = () => {
    return fetch(`${apiUrl}/api/BookClub/currentlyreading/${bookshelfUserObject.id}`)
        .then((r) => r.json());
};

// fetch all TBR books clubs by user
export const getAllTBRBookClubsByLoggedInUser = () => {
    return fetch(`${apiUrl}/api/BookClub/tbr/${bookshelfUserObject.id}`)
        .then((r) => r.json());
};

// fetch all finished books clubs by user
export const getAllFinishedBookClubsByLoggedInUser = () => {
    return fetch(`${apiUrl}/api/BookClub/finished/${bookshelfUserObject.id}`)
        .then((r) => r.json());
};

// fetch all currently reading books clubs by user
export const getAllBookClubsByUser = (id) => {
    return fetch(`${apiUrl}/api/BookClub/${id}`)
        .then((r) => r.json());
}

// fetch all currently reading books clubs by user
export const getAllCurrentlyReadingBookClubsByUser = (id) => {
    return fetch(`${apiUrl}/api/BookClub/currentlyreading/${id}`)
        .then((r) => r.json());

};// fetch all TBR books clubs by user
export const getAllTBRBookClubsByUser = (id) => {
    return fetch(`${apiUrl}/api/BookClub/tbr/${id}`)
        .then((r) => r.json());
};

// fetch all finished books clubs by user
export const getAllFinishedBookClubsByUser = (id) => {
    return fetch(`${apiUrl}/api/BookClub/finished/${id}`)
        .then((r) => r.json());
};



export const deleteBookClub = (id) => {
    return fetch(`https://localhost:5001/api/BookClub/${id}`, { method: "DELETE" })
  }

