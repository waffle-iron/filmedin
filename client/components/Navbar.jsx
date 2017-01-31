import React from 'react';

class NavBar extends React.Component{
	constructor(props) {
		super(props);

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
						<form>
							<label>Search Film: </label>
							<input type="text" placeholder="Film Title" />
							<button type="submit">Search</button>
						</form>
					</li>
					<li>
						<form>
							<label>Search Users: </label>
							<input type="text" placeholder="Name" />
							<button type="submit">Search</button>
						</form>
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