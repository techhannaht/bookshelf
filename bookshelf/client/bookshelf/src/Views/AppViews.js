import { Route, Routes } from "react-router-dom";

import MyProfile from "../Profile/MyProfile";
import FriendProfile from "../Profile/FriendProfile";
import { BookClubRegistrationForm } from "../Profile/NewBookForm";
import ChatRoom from "../Messages/ChatRoom";


export default function ApplicationViews() {

    return (
      <>
        <Routes>
          <Route path="/" element={<MyProfile/>} />
          <Route path="/profile/:id" element={<FriendProfile/>} />
          <Route path="/addBook" element={<BookClubRegistrationForm/>} />
          <Route path="/bookClub/:id" element={<ChatRoom/>} />
        </Routes>
      </>
    );
  
  }