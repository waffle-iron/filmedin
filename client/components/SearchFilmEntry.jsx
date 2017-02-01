import React from 'react';


var SearchFilmEntry = ({handleFilmClick, film}) => (
  <div className="film-entry" onClick={() => handleFilmClick(film)}>
    <span>
      <img src={film.poster_120x171} alt="" />
    </span>
    <span>
      <div>{film.title}</div>
      <div>{film.release_date}</div>
    </span>
  </div>
)



export default SearchFilmEntry;