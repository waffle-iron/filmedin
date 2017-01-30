import React from 'react';
import NavBar from './NavBar';
import FilmList from './FilmList';


var UserProfile = ({allFilms, allFriends}) => (
	<div>
		<NavBar />
				<h2>Welcome [user's first name]!</h2>
				<div>
					<FilmList 
						allFilms={allFilms} 
	          allFriends={allFriends}
					/>
				</div>
				<div>
				</div>
				<div>
				</div>
	</div>
	)


{/*
class UserProfile extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return ( 
			<div>
				<NavBar />
				<h2>Welcome [user's first name]!</h2>
				<div>
					[List of all ranked films]
					<FilmList />
				</div>
				<div>
					[List of user's ranked films]
					<FilmList />
				</div>
				<div>
					[List of user's friends]
				</div>
			</div> 
			)
	}
}
*/}

export default UserProfile;