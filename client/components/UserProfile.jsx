import React from 'react';
import NavBar from './NavBar';
import FilmList from './FilmList';
import UserList from './UserList';

var UserProfile = ({user, handleHomeClick, handleFilmClick, handleUserClick, handleLogOutClick}) => (
		<div className="user-profile">
			<NavBar
				handleHomeClick={handleHomeClick}
				handleLogOutClick={handleLogOutClick}
			/>

			<h1>{user.firstName} {user.lastName}</h1>

			{/*This is the user's film list*/}
			<h3>List of your ranked films</h3>
			<FilmList
				allFilms={user.ratings}
				handleFilmClick={handleFilmClick}
			/>

			{/*This is the user's friend list*/}
			<h3>List of your friends</h3>
			<UserList
				allFriends={user.friends}
				handleUserClick={handleUserClick}
			/>
		</div>
	)

export default UserProfile