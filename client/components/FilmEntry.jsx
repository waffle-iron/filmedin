import React from 'react';
import Rating from 'react-rating';

var FilmEntry = ({handleFilmClick, film}) => (
	<div className="film-entry" onClick={() => handleFilmClick(film)}>
    <div>
      <img src={film.posterURL} alt="" />
    </div>
      <div>{film.name}</div>
      <div>{film.genre}</div>
      <div>{film.rating}</div>
      <div>{film.review}</div>
  </div>
)



export default FilmEntry;