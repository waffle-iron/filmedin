import axios from 'axios';
import React from 'react';
import helpers from '../lib/helpers';

class SignUp extends React.Component {
	constructor(props) {

		super(props);

		this.state = {
			username: 'nickc',
			password: 'pass',
			firstname: 'nick',
			lastname: 'cobbett',
			DOB: '1985-04-18'
		}

		this.handleSignUpClick = this.handleSignUpClick.bind(this);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
		this.handleLastnameChange = this.handleLastnameChange.bind(this);
		this.handleDobChange = this.handleDobChange.bind(this);
		// this.signUpUser = helpers.signUpUser.bind(this);
		// this.logInUser = helpers.logInUser.bind(this);
	}

	handleUsernameChange(e) {
		this.setState({
			username: e.target.value
		})
	}

	handlePasswordChange(e) {
		this.setState({
			password: e.target.value
		})
	}

	handleFirstnameChange(e) {
		this.setState({
			firstname: e.target.value
		})
	}

	handleLastnameChange(e) {
		this.setState({
			lastname: e.target.value
		})
	}

	handleDobChange(e) {
		this.setState({
			dob: e.target.value
		})
	}

	handleLoginClick(event) {
		event.preventDefault();
		var signinInputs = {
			username: this.state.username,
			password: this.state.password
		}
		helpers.logInUser(signinInputs).then(response => {
			window.localStorage.setItem('filmedInToken', response.token);
			console.log('set token');
			this.props.handleLogInClick();
			}).catch(err => {
				console.log('error with login')
			})
	}

	handleSignUpClick(event) {
		event.preventDefault();
	  var signupInputs = {
	    username: this.state.username,
	    password: this.state.password,
	    firstName: this.state.firstname,
	    lastName: this.state.lastname,
	    DOB: this.state.DOB
	  }

		helpers.signUpUser(signupInputs).then(response => {
	    window.localStorage.setItem('filmedInToken', response.token)
	    this.props.handleLogInClick(this.state.username);
  	}).catch(err => {
  		console.log('error with login')
  	})
	}

	render() {
		return (
			<div className="signup">

				{/* this h1 tag is the webApp title, it will include the logo later */}

				{/*this is the navbar for the signup page*/}
				<div className="navbar">
					<h1>FilmedIn</h1>
					<form onSubmit={this.handleLoginClick}>
						<ul>
							<li>
								<label>Username:</label>
								<input type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="your username" />
							</li>
							<li>
								<label>Password:</label>
								<input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="your password" />
							</li>
							<li>
								<button type="submit">Login</button>
							</li>
						</ul>
					</form>
				</div>

			{/*this is the signup form for new users*/}
				<div className="signup">
				<form onSubmit={this.handleSignUpClick}>
					<ul>
						<li>
							<label>First name:</label>
							<input type="text" value={this.state.firstname} onChange={this.handleFirstnameChange} placeholder="your first name" />
						</li>
						<li>
							<label>Last name:</label>
							<input type="text" value={this.state.lastname} onChange={this.handleLastnameChange} placeholder="your last name" />
						</li>
						<li>
							<label>Date of Birth:</label>
							<input type="text" value={this.state.DOB} onChange={this.handleDobChange} placeholder="yyyy-mm-dd" />
						</li>
						<li>
							<label>Username:</label>
							<input type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="your username" />
						</li>
						<li>
							<label>Password:</label>
							<input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="your password" />
						</li>
						<li>
							<button type="submit">Sign up!</button>
						</li>
					</ul>
				</form>
				</div>


			</div>
			)
	}
}

export default SignUp;