import React from 'react';
import NavBar from './NavBar';
import FilmEntry from './FilmEntry';
import FilmList from './FilmList';

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

export default UserProfile;