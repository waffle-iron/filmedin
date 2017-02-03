import React from 'react';
import FilmEntry from './FilmEntry';


var FriendFilmList = ({handleFilmClick, allFilms}) => (
  <div className="friend-film-list">
    {allFilms.map(film =>
      <FilmEntry
        handleFilmClick={handleFilmClick}
        film={film}
      /> )}
  </div>
)


export default FriendFilmList;