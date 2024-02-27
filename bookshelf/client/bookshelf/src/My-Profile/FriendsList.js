export function FriendsList() {
    return (
        <>
            <h1><i>Friends</i></h1>
            <ul className="list-group mt-4">
                {/* loop through friends list */}
                <li className="list-group-item disabled" aria-disabled="true">
                    <span className="font-weight-bold ml-4">friends list</span>
                </li>

            </ul>
        </>
    )
}