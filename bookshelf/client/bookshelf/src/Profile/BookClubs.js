export function BookClubs() {
    return (
        <>
            <h1>Book Clubs</h1>

            <ul className="list-group mt-4">
                {/* loop through book clubs */}
                <li className="list-group-item disabled" aria-disabled="true">
                    <span className="font-weight-bold ml-4">book clubs</span>
                </li>

            </ul>
        </>
    )
}