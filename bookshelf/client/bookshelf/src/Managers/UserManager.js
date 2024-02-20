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

  // logout
  export const logout = () => {
    localStorage.clear()
};