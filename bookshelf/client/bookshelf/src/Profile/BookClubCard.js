import { Link } from "react-router-dom";

export function BookClubCard({ bookClub }) {

    return (

        <div className="card m-4" style={{ width: '18rem' }} key={bookClub.id}>
            <div className="card-body text-center">
                <Link to={`/bookClub/${bookClub?.bookId}`}>
                    <label className="font-weight-bold" style={{ fontSize: '1.2em' }}><b>{bookClub?.book?.title}</b></label>
                </Link>
            </div>
        </div>

    )
}