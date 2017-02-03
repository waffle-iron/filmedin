import axios from 'axios';
import React from 'react';
import helpers from '../lib/helpers';

class SignUp extends React.Component {
	constructor(props) {

		super(props);

		this.state = {
			username: '',
			password: '',
			newUsername: '',
			newPassword: '',
			firstname: '',
			lastname: '',
			email: '',
			DOB: '',
			loginMsg: 'valid-login'
		}

		this.handleSignUpClick = this.handleSignUpClick.bind(this);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
		this.handleLastnameChange = this.handleLastnameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleDobChange = this.handleDobChange.bind(this);
		this.handleNewUsernameChange = this.handleNewUsernameChange.bind(this);
		this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
		// this.signUpUser = helpers.signUpUser.bind(this);
		// this.logInUser = helpers.logInUser.bind(this);
	}
	componentWillMount () {
		this.setState({loginMsg: 'valid-login'});
	}
	handleUsernameChange(e) {
		this.setState({
			username: e.target.value
		})
	}
	handleNewUsernameChange(e) {
		this.setState({
			newUsername: e.target.value
		})
	}
	handleNewPasswordChange(e) {
		this.setState({
			newPassword: e.target.value
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
	handleEmailChange(e) {
		this.setState({
			email: e.target.value
		})
	}

	handleDobChange(e) {
		this.setState({
			DOB: e.target.value
		})
	}

	handleLoginClick(event) {
		event.preventDefault();
		var signinInputs = {
			username: this.state.username,
			password: this.state.password
		}
		helpers.logInUser(signinInputs).then(response => {
			window.localStorage.setItem('filmedInToken', response.data.token);
			this.setState({loginMsg: 'valid-login'});
			this.props.handleLogInClick(this.state.username);
			}).catch(err => {
				this.setState({loginMsg:'invalid-login'});
				console.log('error with login', err)
			})
	}

	handleSignUpClick(event) {
		event.preventDefault();
	  var signupInputs = {
	    username: this.state.newUsername,
	    password: this.state.newPassword,
	    firstName: this.state.firstname,
	    lastName: this.state.lastname,
	    email: this.state.email,
	    DOB: this.state.DOB
	  }

		helpers.signUpUser(signupInputs).then(response => {
	    window.localStorage.setItem('filmedInToken', response.data.token)
	    this.props.handleLogInClick(this.state.username);
  	}).catch(err => {
  		console.log('error with signup')
  	})
	}

	render() {
		return (
			<div>
        <div className="navbar navbar-default navbar-fixed-top login-bar">
            <div className="container login-bar-container">
                <div className="navbar-header login-bar-header">
                    <a className="navbar-brand" href="#">FilmedIn</a>
                </div>
                <div className="user-login">
                    <div className="navbar-collapse collapse" id="navbar-main">
                        <form className="navbar-form navbar-right" role="search">
                        		<div className={"form-group user-search " + this.state.loginMsg}>
                        			<label>Invalid Login</label>
                        		</div>
                            <div className="form-group user-search">
                                <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsernameChange} name="username" placeholder="Username"/>
                            </div>
                            <div className="form-group user-search">
                                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} name="password" placeholder="Password"/>
                            </div>
                            <button type="submit" onClick={this.handleLoginClick} className="btn btn-default">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <img src="/assets/poster.jpg" className="background-poster" />
        <img src="/assets/logo.png" className="logo-home" />
        <div className="sn-jumbotron jumbotron-home welcome-page">
	        <div className="float-md-left col-md-7">
	        <h1 className="alt-h1 text-shadow-dark text-white lh-condensed mb-3">Get FilmedIn Now!</h1>
	        <p className="alt-lead text-shadow-dark text-white">FilmedIn connects you with your friends so that you can get movie recommendations based on what people you like actually like.</p>
		      </div>
        </div>
				<div className="signup-form">
					<input type="text" value={this.state.newUsername} onChange={this.handleNewUsernameChange} placeholder="Username" />
					<input type="password" value={this.state.newPassword} onChange={this.handleNewPasswordChange} placeholder="Password" />
					<input type="text" value={this.state.firstname} onChange={this.handleFirstnameChange} placeholder="First Name" />
					<input type="text" value={this.state.lastname} onChange={this.handleLastnameChange} placeholder="Last Name" />
					<input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="E-Mail" />
					<input type="text" value={this.state.DOB} onChange={this.handleDobChange} placeholder="Date of Birth (yyyy-mm-dd)" />
					<button className="btn btn-default" onClick={this.handleSignUpClick} >Register</button>
				</div>
			{/*this is the signup form for new users*/}
			</div>
			)
	}
}

export default SignUp;


				// <div className="signup">
				// <form onSubmit={this.handleSignUpClick}>
				// 	<ul>
				// 		<li>
				// 			<label>First name:</label>
				// 			<input type="text" value={this.state.firstname} onChange={this.handleFirstnameChange} placeholder="your first name" />
				// 		</li>
				// 		<li>
				// 			<label>Last name:</label>
				// 			<input type="text" value={this.state.lastname} onChange={this.handleLastnameChange} placeholder="your last name" />
				// 		</li>
				// 		<li>
				// 			<label>Date of Birth:</label>
				// 			<input type="text" value={this.state.DOB} onChange={this.handleDobChange} placeholder="yyyy-mm-dd" />
				// 		</li>
				// 		<li>
				// 			<label>Username:</label>
				// 			<input type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="your username" />
				// 		</li>
				// 		<li>
				// 			<label>Password:</label>
				// 			<input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="your password" />
				// 		</li>
				// 		<li>
				// 			<button type="submit">Sign up!</button>
				// 		</li>
				// 	</ul>
				// </form>
				// </div>


				// <div className="navbar">
				// 	<form onSubmit={this.handleLoginClick}>
				// 		<ul>
				// 			<li>
				// 				<label>Username:</label>
				// 				<input type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="your username" />
				// 			</li>
				// 			<li>
				// 				<label>Password:</label>
				// 				<input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="your password" />
				// 			</li>
				// 			<li>
				// 				<button type="submit">Login</button>
				// 			</li>
				// 		</ul>
				// 	</form>
				// </div>