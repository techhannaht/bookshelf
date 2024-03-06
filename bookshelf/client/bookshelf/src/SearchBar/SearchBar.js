import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Card } from "reactstrap";

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        fetch(`/api/user/search?query=${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setResults(data);
            })
            .catch(error => {
                console.error('Error searching users:', error);
            });
    };

    const handleClear = () => {
        setQuery('');
        setResults([]);
    };

    return (
        <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users..."
            />
            <Button color="primary" aria-label="edit" onClick={handleSearch}>
                Search
            </Button>
            {results.length > 0 && (
                <Button color="danger" onClick={handleClear}>
                    Clear
                </Button>
            )}
        </div>
        <div>
         <Card>
         {results.map((user) => (
             <div key={user.id}>
                 <Link to={`/profile/${user.id}`}>{user.userName}</Link>
             </div>
         ))}
     </Card>
     </div>
     </>
    );
};

export default SearchBar;
