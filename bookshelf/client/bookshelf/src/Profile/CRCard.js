import { Progress } from "reactstrap"

export function CRCard({book, bookClub}) {

    return (
    <div className="row">
    <div className="card m-4" style={{ width: '18rem' }} key={book?.id}>
          <div className="card-body text-center">
            <div>
                <label className="font-weight-bold" style={{ fontSize: '1.2em' }} ><b>{book?.title}</b></label>
            </div>
            <div>
                <label className="font-weight-bold"><i>{book?.author}</i></label>
            </div>
            <div>
                <label className="font-weight-bold"><i>{book?.genre}</i></label>
            </div>
            <div>
                <Progress
                    animated
                    color="primary"
                    striped
                    max={book?.totalPage}
                    value={bookClub.currentPage}
                />
                <p> on page {bookClub.currentPage} of {book?.totalPage} </p>
            </div>
        </div>
    </div>
</div>
    )

}