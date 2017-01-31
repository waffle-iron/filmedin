import axios from 'axios';
import react from 'react';


var getHeaders = function () {
  var headers = {
    'x-access-token': window.localStorage.getItem('filmedInToken'),
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': '*',
    'access-control-max-age': 10
  }
  return headers;
}

var helpers = {};

// helpers.logInUser = function() {
//   return axios.post('https://filmedin.herokuapp.com/home', getHeaders())
// }
helpers.logInUser = function(signinInputs) {
  //var config = getHeaders();
  return axios.request({
    url: 'https://filmedin.herokuapp.com/signin',
    method: 'POST',
    data: signinInputs
  })
}
helpers.signUpUser = function(signupInputs) {
  console.log(signupInputs)
  var config = getHeaders();
  config.data = signupInputs
  return axios.request({
    url: 'https://filmedin.herokuapp.com/signup',
    method: 'POST',
    // headers: getHeaders(),
    data: signupInputs
  }).catch(err => {
    console.log(err)
  })
}

helpers.getFilm = function() {}


export default helpers