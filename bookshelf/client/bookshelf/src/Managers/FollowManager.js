const apiUrl = "https://localhost:5001/Follow";

export const addFollow = (singleFollow) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleFollow),
    });
  };

  export const deleteFollow = (userId, friendId) => {
    return fetch(`https://localhost:5001/api/Follow/${userId}/${friendId}`, { method: "DELETE" })
  }
  
  export const getAllFollowsByLoggedInUser = (id) => {
    return fetch(`https://localhost:5001/api/Follow/${id}`)
      .then((res) => res.json())
  };