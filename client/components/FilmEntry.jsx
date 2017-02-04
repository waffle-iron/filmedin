import React from 'react';
import Rating from 'react-rating';

var FilmEntry = ({handleFilmClick, film, rating}) => (
  <div className="film-entry" onClick={() => handleFilmClick(film)}>
    <div className="film-entry-poster" >
      <img src={film.posterURL} alt="" />
    </div>
    <div className="film-entry-info">
      <div className="film-entry-name">{film.name} ({film.releaseDate ? film.releaseDate.substring(0,4) : ""})</div>
      <div className="film-entry-genre">Genre: {film.genre}</div>
      <Rating className="ratingStar" empty="fa fa-star-o fa-2x" full="fa fa-star fa-2x" initialRate={film.rating} readonly={!rating}/>
    </div>
  </div>
)



export default FilmEntry;