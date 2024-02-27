import { MyBookClubs } from './MyBookClubs';
import { MyCurrentlyReading } from './MyCurrentlyReading';
import { MyFriendsList } from './MyFriendsList';
import './Profile.css';
import { MyUserDetails } from './MyUserDetails';

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
                </div>
            </section>
            <section className="bookshelf-currentlyreading-bookclubs">
                {/* Currently Reading */}
                <div className="currently-reading">
                <MyCurrentlyReading/>
                </div>
                {/* Book Clubs */}
                <div className="book-clubs">
                <MyBookClubs/>
                </div>
            </section>
        </>
    )
}