import { MyBookClubs } from './MyBookClubs';
import { MyCurrentlyReading } from './MyCurrentlyReading';
import { MyFriendsList } from './MyFriendsList';
import './Profile.css';
import { MyUserDetails } from './MyUserDetails';
import { Link } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';

export default function MyProfile() {
    return (
        <>
        <div className="bookshelf">
            <section className="bookshelf-userdetails-friendslist">
                {/* User Details Section */}
                <section className="user-details">
                <MyUserDetails/>
                </section>
                {/* Friends List */}
                <section className="friends-list">
                <MyFriendsList/>
                <SearchBar/>
                </section>
            </section>
            <section className="bookshelf-currentlyreading-bookclubs" style={{ paddingLeft: '20px' }} >
                {/* Currently Reading */}
                <Card className="currently-reading" >
                <MyCurrentlyReading/>
                <p>
                <Link to="/addBook" className="btn btn-primary">Add A Book</Link>
                </p>
                </Card>
                {/* Book Clubs */}
                <Card className="book-clubs">
                <MyBookClubs/>
                </Card>
            </section>
        </div>
        </>
    )
}