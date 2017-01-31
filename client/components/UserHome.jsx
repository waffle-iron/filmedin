import React from 'react';
import NavBar from './NavBar';
import FilmList from './FilmList';


var UserHome = ({handleFilmClick, handleHomeClick, toggleLoggedIn, allFilms, allFriends}) => (
	<div>
		<NavBar 
			handleHomeClick={handleHomeClick}
			toggleLoggedIn={toggleLoggedIn}
		/>
				<h2>Welcome [user's first name]!</h2>
				<div>
					<FilmList 
						handleFilmClick={handleFilmClick}
						allFilms={allFilms} 
					/>
				</div>
				<div>
					
				</div>
	</div>
	)


export default UserHome;