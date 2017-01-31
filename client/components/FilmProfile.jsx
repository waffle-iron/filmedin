import React from 'react';
import NavBar from './NavBar';

var FilmProfile = ({film, handleHomeClick, handleLogOutClick}) => (
		<div className="film-profile">
			<NavBar
				handleHomeClick={handleHomeClick}
				handleLogOutClick={handleLogOutClick}
			/>
			{/*This is the film title*/}
			<h1>{film.snippet.title}</h1>

			{/*This is the film image*/}
			<img src={film.snippet.thumbnails.default.url} alt="" />

			{/*This is the user's rank*/}
			<div>Your ranking: {film.userRank}</div>
			<br />
			{/*This is the film description:
				Film year, Film genre, Film actors, Film description
			*/}
			<div>Film Description:<br />{film.snippet.description}</div>
			<br />
			{/*These are links to stream film*/}
			<div>This will contain links to stream the film</div>
			<br />
			{/*These are friends who have ranked the film*/}
			<div>This will contain friends who have ranked the film</div>

		</div>
	)

export default FilmProfile