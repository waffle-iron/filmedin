import axios from 'axios';
import react from 'react';

var getRequest = function (url) {
  var request = {
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',

    },
    url: url,
    baseURL: 'https://filmedin.herokuapp.com/',
    method: 'GET'
  }
  return request;
}

var helpers = {};

helpers.logInUser = function(data) {
  return axios.request({
    url: 'https://filmedin.herokuapp.com/signin',
    method: 'POST',
    data: data
  });
}
helpers.signUpUser = function(data) {
  return axios.request({
    url: 'https://filmedin.herokuapp.com/signup',
    method: 'POST',
    data: data
  });
}
helpers.getHome = function () {
  return axios.request(getRequest('/home'));
}
helpers.getFeed = function () {
  return axios.request(getRequest('/feed'));
}
helpers.getProfile = function (id) {
  return axios.request(getRequest('/profile/' + id));
}
helpers.getFilm = function(id) {
  return axios.request(getRequest('/film/' + id));
}

helpers.searchProfile = function(search) {
  return axios.request(getRequest('/searchprofile/' + search));
}
helpers.searchFilm = function(search) {
  return axios.request(getRequest('/searchfilm/' + search));
}
helpers.addFriend = function(friendID) {
  return axios.request({
    url: 'https://filmedin.herokuapp.com/friend',
    method: 'POST',
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      friendID: friendID
    }
  });
}
helpers.addRating = function(filmID, rating, review) {
  return axios.request({
    url: 'https://filmedin.herokuapp.com/rating',
    method: 'POST',
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      filmID: filmID,
      rating: rating,
      review: review
    }
  });
}

helpers.castList = function(string) {
  return string.split(';').map(pair => {
    return pair.split(':')
  })
}
helpers.dateDiff = function(date) {
  var today = new Date();
  var calcDate = new Date(date);
  var diff = today - calcDate;
  var msec = diff;
  var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
  msec -= dd * 1000 * 60 * 60 * 24;
  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  return (dd !== 0 ? (dd + "d ") : "") + (hh !== 0 ? (hh + "h ") : "") + (mm !== 0 ? (mm + "m ") : "");
}
export default helpers