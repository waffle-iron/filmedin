import React from 'react';
import FilmEntry from './FilmEntry';


var FilmList = ({handleFilmClick, allFilms, allFriends}) => (
	<div>
		{console.log('allFilms: ', allFilms)}
		{allFilms.map(film => 
			<FilmEntry 
				handleFilmClick={handleFilmClick}
				film={film} 
			/> )}
	</div>
)


export default FilmList;