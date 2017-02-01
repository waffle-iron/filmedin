import React from 'react';
import NavBar from './NavBar';
import FilmList from './FilmList';
import UserList from './UserList';


var UserHome = ({handleFilmClick, handleUserClick, firstName, lastName, allFilms, allFriends}) => (
	<div className="user-home">

				<h2>Welcome {firstName} {lastName}</h2>
				<div>
					<h3>List of user's ranked films</h3>
					<FilmList
						handleFilmClick={handleFilmClick}
						allFilms={allFilms}
					/>
				</div>
				<div>
					<h3>List of user's friends</h3>
					<UserList
						handleUserClick={handleUserClick}
						allFriends={allFriends}
					/>
				</div>
	</div>
	)


export default UserHome;