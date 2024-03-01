import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users..."
            />
            <button onClick={handleSearch}>Search</button>

            <div>
                {results.map((user) => (
                  <div key={user.id}>
                  <Link to={`/profile/${user.id}`}>{user.userName}</Link>
              </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
