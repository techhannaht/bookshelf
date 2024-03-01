import { MyBookClubs } from './MyBookClubs';
import { MyCurrentlyReading } from './MyCurrentlyReading';
import { MyFriendsList } from './MyFriendsList';
import './Profile.css';
import { MyUserDetails } from './MyUserDetails';
import { Link } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';

export default function MyProfile() {
    return (
        <>
            <section className="bookshelf-userdetails-friendslist">
                {/* User Details Section */}
                <div className="user-details">
                <MyUserDetails/>
                </div>
                {/* Friends List */}
                <div className="friends-list">
                <MyFriendsList/>
                <SearchBar/>
                </div>
            </section>
            <section className="bookshelf-currentlyreading-bookclubs">
                {/* Currently Reading */}
                <div className="currently-reading">
                <MyCurrentlyReading/>
                <Link to="/addBook" className="btn btn-primary">Add A Book</Link>
                </div>
                {/* Book Clubs */}
                <div className="book-clubs">
                <MyBookClubs/>
                </div>
            </section>
        </>
    )
}