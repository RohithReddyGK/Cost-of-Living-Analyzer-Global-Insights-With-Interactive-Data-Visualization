import React from 'react';
import './SearchBar.css';

const SearchBar = ({ placeholder, value, onChange }) => {
    return (
        <input type="text" placeholder={placeholder} value={value} onChange={onChange} className="search-bar"/>
    );
};

export default SearchBar;
