import React from 'react';
import SignUp from './SignUp';
import UserProfile from './UserProfile';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	isLoggedIn: false,
      allFilms: [],
      allFriends: []
    }
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this)
  }

  toggleLoggedIn() {
  	this.setState({
  		isLoggedIn: true
  	})
  }


  render() {
  	
	  if (this.state.isLoggedIn) {
	  	return ( 
        <UserProfile 
          allFilms={this.state.allFilms} 
          allFriends={this.state.allFriends}
        /> 
      )
	  } else {
	    return ( <SignUp toggleLoggedIn={this.toggleLoggedIn} /> )
	  }


  }
}

export default App;