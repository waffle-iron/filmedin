import React from 'react';
import NavBar from './NavBar';
import FilmList from './FilmList';
import UserList from './UserList';

var UserProfile = ({user, handleHomeClick, handleFilmClick, handleUserClick, toggleLoggedIn}) => (
		<div className="user-profile">
			<NavBar 
				handleHomeClick={handleHomeClick}
				toggleLoggedIn={toggleLoggedIn}
			/>

			<h1>{user.firstname} {user.lastname}</h1>

			{/*This is the user's film list*/}
			<FilmList 
				allFilms={user.films} 
				handleFilmClick={handleFilmClick}
			/>

			{/*This is the user's friend list*/}
			<UserList 
				allFriends={user.friends}
				handleUserClick={handleUserClick}
			/>
		</div>
	)

export default UserProfile