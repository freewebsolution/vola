import React, { useState } from 'react';

const SearchBar = ({ onSearchChange }) => {
    const [search, setSearch] = useState('');
    const manageSearch = (evt) => {
        evt.preventDefault();
        const s = evt.target.value;
        setSearch(s);
    }
    const searchMovie = (evt) => {
        evt.preventDefault();
        if (search.length > 3) {
            onSearchChange(search);
        }
    }
    return (
        <div>
            <form className="d-flex" role="search">
                <input name='search' onChange={manageSearch} className="form-control me-2" type="search" placeholder="Cerca per titolo..." aria-label="Search" value={search} />
                <button className="btn btn-outline-success me-2" type="submit" onClick={searchMovie}><i className="fas fa-search"></i></button>
                <button onClick={() => setSearch('')} className="btn btn-outline-warning" type="reset"><i className="fa-solid fa-power-off"></i></button>
            </form>
        </div>
    );
};

export default SearchBar;