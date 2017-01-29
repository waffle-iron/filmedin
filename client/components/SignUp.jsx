import React from 'react';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>

				{/* this h1 tag is the webApp title, it will include the logo later */}
				<h1>FilmedIn</h1>

				{/*this is the navbar for the signup page*/}
				<nav>
					<form>
						<label>Username:</label>
						<input type="text" placeholder="your username" />
						<label>Password:</label>
						<input type="text" placeholder="your password" />
						<button type="submit">Login</button>
					</form>
				</nav>




			</div>
			)
	}
}

export default SignUp;