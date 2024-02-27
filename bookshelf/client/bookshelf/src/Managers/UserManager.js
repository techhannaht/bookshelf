const apiUrl = "https://localhost:5001";


// fetch all profiles 
export const getallprofiles = () => {
    return fetch(`${apiUrl}/api/User`)
      .then((r) => r.json());
  };

// login to bookshelf
  export const login = (userObject) => {
    return fetch(`${apiUrl}/api/User/getbyusername?username=${userObject.userName}`)
    .then((r) => r.json())
      .then((userProfile) => {
        if(userProfile.id){
          localStorage.setItem("userProfile", JSON.stringify(userProfile));
          return userProfile
        }
        else{
          return undefined
        }
      });
  };

    // fetch all profiles info by username
export const getAllProfileInfoByUser = (userObject) => {
    return fetch(`${apiUrl}/api/User/getbyusername?username=${userObject.userName}`)
      .then((r) => r.json());
  };

    // fetch all profiles info by user Id
export const getAllProfileInfoById = (id) => {
    return fetch(`${apiUrl}/api/User/GetById?id=${id}`)
      .then((r) => r.json());
  };


  // logout
  export const logout = () => {
    localStorage.clear()
};

export const register = (userObject, password) => {
    return  fetch(`${apiUrl}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    })
    .then((response) => response.json())
      .then((savedUserProfile) => {
        localStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
      });
  };

 
  