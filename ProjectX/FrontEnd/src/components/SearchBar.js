import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Pesquisar nome, ip ou estad.."
      onChange={handleChange}
    />
  );
};

export default SearchBar;
