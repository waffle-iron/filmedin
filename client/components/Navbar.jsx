import React from 'react';
import helpers from '../lib/helpers'

class NavBar extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			userSearch: '',
			filmSearch: ''
		}
	}
	changeUser (e) {
		this.setState({userSearch: e.target.value});
	}
	changeFilm (e) {
		this.setState({filmSearch: e.target.value});
	}
	searchFilm() {
		helpers.searchFilm(this.state.filmSearch).then(films => {
			console.log(films);
      this.props.searchFilm(films.data);
    }).catch(err => {
      console.log('error with search film', err)
    })
		
	}
	searchUser() {
		helpers.searchProfile(this.state.userSearch).then(friends => {
			console.log(friends);
      this.props.searchUser(friends.data);
    }).catch(err => {
      console.log('error with search user', err)
    })
		
	}


	render() {
		return (
			<div className="navbar">
				<h1>FilmedIn</h1>
				<ul>
					<li>
						<a href="#" onClick={this.props.handleHomeClick}>Home</a>
					</li>
					<li>
						<div>
							<label>Search Film: </label>
							<input type="text" placeholder="Film Title" onChange={this.changeFilm.bind(this)} value={this.state.filmSearch} />
							<button onClick={this.searchFilm.bind(this)}>Search</button>
						</div>
					</li>
					<li>
						<div>
							<label>Search Users: </label>
							<input type="text" placeholder="Name" onChange={this.changeUser.bind(this)} value={this.state.userSearch}/>
							<button onClick={this.searchUser.bind(this)}>Search</button>
						</div>
					</li>
					<li>
						<a href="#" onClick={this.props.handleLogOutClick}>Logout</a>
					</li>


				</ul>
			</div>
		)
	}
}

export default NavBar;