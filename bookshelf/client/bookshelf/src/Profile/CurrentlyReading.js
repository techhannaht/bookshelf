export function CurrentlyReading() {
    return (
        <>
            <h1 className="text-left">Currently Reading:</h1>

            <div className="row">
                {/* loop through books */}
                <div className="card m-4" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <div>
                            <label className="font-weight-bold">Book Title</label>
                        </div>
                        <div>
                            <label className="font-weight-bold">Author</label>
                        </div>
                        <div>
                            <label className="font-weight-bold">Genre</label>
                        </div>
                        <div>
                            <label className="font-weight-bold">Progress Bar</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}