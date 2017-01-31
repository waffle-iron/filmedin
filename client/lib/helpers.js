import axios from 'axios';
import react from 'react';


var getHeaders = function () {
  var config = {
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'access-control-allow-headers': '*',
      'access-control-max-age': 10
    }
  };
  return config;
}

var helpers = {};

helpers.logInUser = function() {
  return axios.get('https://filmedin.herokuapp.com/home', getHeaders())
}

helpers.signUpUser = function(signupInputs) {
  var config = getHeaders();
  config.data = signupInputs
  return axios.post('https://filmedin.herokuapp.com/signup', config)
}

helpers.getFilm = function() {}


export default helpers