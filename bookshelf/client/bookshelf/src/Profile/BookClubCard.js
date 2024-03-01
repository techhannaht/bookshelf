import { Link } from "react-router-dom";
import { deleteBookClub } from "../Managers/BookClubManager";
import { Button } from "reactstrap";
import { BellSlash } from "react-bootstrap-icons";

export function BookClubCard({ bookClub }) {

    function refreshPage() {
        window.location.reload();
    }

    return (

        <div className="card m-4" style={{ width: '18rem' }} key={bookClub.id}>
            <div className="card-body text-center">
                <Link to={`/bookClub/${bookClub?.id}`}>
                    <label className="font-weight-bold" style={{ fontSize: '1.2em' }}><b>{bookClub?.book?.title}</b></label>
                </Link>
                {/* <p>
                    <Button color="danger" onClick={() => { deleteBookClub(bookClub.id); refreshPage(); }}>
                        <BellSlash/>
                    </Button>
                </p> */}
            </div>
        </div>

    )
}