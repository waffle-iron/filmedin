import React from 'react';
import SearchFilmEntry from './SearchFilmEntry';


var SearchFilmList = ({handleFilmClick, allFilms}) => (
  <div className="search-film-list">
    {allFilms.map(film =>
      <SearchFilmEntry
        handleFilmClick={handleFilmClick}
        film={film}
      /> )}
  </div>
)


export default SearchFilmList;