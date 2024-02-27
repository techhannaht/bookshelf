import { BookClubs } from './BookClubs';
import { CurrentlyReading } from './CurrentlyReading';
import { FriendsList } from './FriendsList';
import './Profile.css';
import { UserDetails } from './UserDetails';

export default function Profile() {
    return (
        <>
            <section className="bookshelf-userdetails-friendslist">
                {/* User Details Section */}
                <div className="user-details">
                <UserDetails/>
                </div>
                {/* Friends List */}
                <div className="friends-list">
                <FriendsList/>
                </div>
            </section>
            <section className="bookshelf-currentlyreading-bookclubs">
                {/* Currently Reading */}
                <div className="currently-reading">
                <CurrentlyReading/>
                </div>
                {/* Book Clubs */}
                <div className="book-clubs">
                <BookClubs/>
                </div>
            </section>
        </>
    )
}