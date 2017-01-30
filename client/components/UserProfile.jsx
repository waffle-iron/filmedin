import React from 'react';
import NavBar from './NavBar';
import FilmList from './FilmList';


var UserProfile = ({handleFilmClick, toggleLoggedIn, allFilms, allFriends}) => (
	<div>
		<NavBar toggleLoggedIn={toggleLoggedIn}/>
				<h2>Welcome [user's first name]!</h2>
				<div>
					<FilmList 
						handleFilmClick={handleFilmClick}
						allFilms={allFilms} 
	          allFriends={allFriends}
					/>
				</div>
	</div>
	)


export default UserProfile;