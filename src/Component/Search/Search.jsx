import { useState } from 'react';
import './search.css';

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        onSearch(searchTerm.trim());
    }

    return (
        <form className="search-form" onSubmit={handleSubmit} role="search">
            <input
                id="search-input"
                type="text"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                placeholder="Search Pokémon"
                aria-label="Search Pokémon by name"
            />
            <button className="search-button" type="submit">
                Search
            </button>
        </form>
    );
}

export default Search;