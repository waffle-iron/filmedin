import React from 'react';
import NavBar from './NavBar';
import FilmList from './FilmList';
import UserList from './UserList';


var UserHome = ({handleFilmClick, handleUserClick, profile, username}) => (
	<div className="user-home">
		<div className="user-home-personal">
			<h3>{profile.firstName} {profile.lastName}</h3>
			<h4>{username}</h4>
			<div><i>Member since: {new Date(profile.createdAt).toLocaleDateString("en-US", {year: "numeric", month: "short",day: "numeric"})}</i></div>
			<div className="friendStat">
				<img className="friendsLogo" src="assets/friends.png"/>
				{profile.friends.length} Friend(s)
			</div>
			<div className="friendStat">
				<img className="friendsLogo" src="assets/logo2.png"/>
				{profile.ratings.length} Movie(s) Rated
			</div>
			<FilmList
				handleFilmClick={handleFilmClick}
				allFilms={profile.ratings}
			/>
		</div>
		<div className="user-home-feed">
			
		</div>
		<div className="user-home-friends">
			<UserList
				handleUserClick={handleUserClick}
				allFriends={profile.friends}
			/>
		</div>
	</div>
	)


export default UserHome;