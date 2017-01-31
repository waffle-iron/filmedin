import React from 'react';


var FilmEntry = ({handleFilmClick, film}) => (
	<div className="film-entry" onClick={() => handleFilmClick(film)}>
    <div>
      <img src={film.snippet.thumbnails.default.url} alt="" />
    </div>
      <div>{film.snippet.title}</div>
      <div>{film.snippet.description}</div>
  </div>
)



export default FilmEntry;