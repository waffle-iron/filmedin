import axios from 'axios';
import react from 'react';

var helpers = {};

helpers.logInUser = function() {

  var config = {
    headers: {'x-access-token': this.state.token}
  };

  axios.get('https://filmedin.herokuapp.com/home', config).then(reponse => {
    console.log('response: ', response)
    this.setState({
      firstName: response.firstName,
      lastName: response.lastName,
      allFriends: response.friends,
      allFilms: response.rating
      // what should it be??
    })
    this.props.toggleLoggedIn();
  })
}

helpers.signUpUser = function() {

  var signupInputs = {
    username: this.state.username,
    password: this.state.password,
    firstname: this.state.firstname,
    lastname: this.state.lastname,
    dob: this.state.dob
  }
  axios.post('https://filmedin.herokuapp.com/signup', signupInputs).then(response => {
    window.localStorage.setItem('FilmedInToken', reponse.token)
    this.props.toggleLoggedIn();

  })
}


export default helpers