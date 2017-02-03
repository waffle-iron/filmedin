import React from 'react';


var SearchFilmEntry = ({handleFilmClick, film}) => (
  <div className="search-film-entry" onClick={() => handleFilmClick(film)}>
  {console.log(film)}
    <div className="search-film-entry-poster">
      <img className="search-film-entry-poster-img" src={film.poster_120x171} alt="" />
    </div>
    <div className="search-film-entry-info">
      <div className="search-film-entry-title">{film.title} ({film.release_year})</div>

    </div>
  </div>
)



export default SearchFilmEntry;
      // <div>Release Date: {film.release_date}</div>