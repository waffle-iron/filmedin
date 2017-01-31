import React from 'react';
import NavBar from './NavBar';
import FilmList from './FilmList';
import UserList from './UserList';


var UserHome = ({handleFilmClick, handleHomeClick, handleUserClick, toggleLoggedIn, allFilms, allFriends}) => (
	<div className="user-home">
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
					<UserList
						handleUserClick={handleUserClick}
						allFriends={allFriends}
					/>
				</div>
	</div>
	)


export default UserHome;