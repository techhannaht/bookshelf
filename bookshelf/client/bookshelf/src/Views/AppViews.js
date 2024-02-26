import { Route, Routes } from "react-router-dom";

import Profile from "../Profile/Profile";

export default function ApplicationViews() {

    return (
      <>
        <Routes>
          <Route path="/" element={<Profile/>} />
        </Routes>
      </>
    );
  
  }