const apiUrl = "https://localhost:5001/Messages";

export const getAllMessagesByBookClub = (bookClubId) => {
    return fetch(`https://localhost:5001/api/Messages?bookClubId=${bookClubId}`)
      .then((res) => res.json())
  };

  export const addMessage = (singleMessage) => {
    return fetch(`https://localhost:5001/api/Messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleMessage),
    });
  };

  export const deleteMessage = (id) => {
    return fetch(`https://localhost:5001/api/Messages/${id}`, { method: "DELETE" })
  }