import React from 'react';
import NavBar from './NavBar';
import FilmList from './FilmList';
import UserList from './UserList';


var UserHome = ({handleFilmClick, handleUserClick, firstName, lastName, allFilms, allFriends}) => (
	<div className="user-home">

				<h2>Welcome {firstName} {lastName}</h2>
				<div className="ranked-films">
					<h3>List of your ranked films</h3>
					<FilmList
						handleFilmClick={handleFilmClick}
						allFilms={allFilms}
					/>
				</div>
				<div className="friend-list">
					<h3>List of your friends</h3>
					<UserList
						handleUserClick={handleUserClick}
						allFriends={allFriends}
					/>
				</div>
	</div>
	)


export default UserHome;