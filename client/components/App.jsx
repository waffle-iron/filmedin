import axios from 'axios';
import React from 'react';
import SignUp from './SignUp';
import UserHome from './UserHome';
import FilmProfile from './FilmProfile';
import UserProfile from './UserProfile';
import exampleVideoData from './exampleVideoData';
import exampleFriendData from './exampleFriendData';
import helpers from '../lib/helpers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // token: window.localStorage.getItem('filmedInToken'),
    	isLoggedIn: false,
      firstName: '',
      lastName: '',
      allFilms: exampleVideoData,
      allFriends: exampleFriendData,
      clickedFilm: {},
      clickedUser: {},
      view: ''
    }
    // this.toggleLoggedIn = this.toggleLoggedIn.bind(this)
    this.handleFilmClick = this.handleFilmClick.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.handleUserClick = this.handleUserClick.bind(this)
    this.handleLogInClick = this.handleLogInClick.bind(this)
    this.handleLogOutClick = this.handleLogOutClick.bind(this)
    // this.logInUser = helpers.logInUser.bind(this)
  }

  //keep as toggle because works for signout
  //how do i handle clearing of token on signout?
  // toggleLoggedIn() {

  //   if (this.state.isLoggedIn) {
  //     window.localStorage.removeItem('filmedInToken');
  //   }

  //   this.setState({
  //     isLoggedIn: !this.state.isLoggedIn,
  //     view: 'showUserHomeView'
  //   })
  // }

  handleLogOutClick() {
    window.localStorage.removeItem('filmedInToken');
    this.setState({
      isLoggedIn: false,
      view: ''
    })
  }

  handleLogInClick(username) {
    this.setState({
      isLoggedIn: true,
      view: 'showUserHomeView'
    })
  }


  handleUserClick(user) {
    this.setState({
      view: 'showUserView',
      clickedUser: user
    })
  }

  handleFilmClick(film) {
    this.setState({
      view: 'showFilmView',
      clickedFilm: film
    })
  }

  handleHomeClick() {
    this.setState({
      view: 'showUserHomeView',
    })
  }

  //get request for allFilms and allFriends
  componentDidMount() {
   // include token here
    // helpers.logInUser().then(response => {
    //   console.log('response: ', response)
    //   this.setState({
    //     firstName: response.firstName,
    //     lastName: response.lastName,
    //     allFriends: response.friends,
    //     allFilms: response.rating
    //     // what should it be??
    //   })
    //   this.toggleLoggedIn();
    // })
  }

  render() {

	  if (this.state.isLoggedIn) {
      if (this.state.view === 'showFilmView') {
        return (
          <FilmProfile
            handleHomeClick={this.handleHomeClick}
            handleUserClick={this.handleUserClick}
            handleLogOutClick={this.handleLogOutClick}
            film={this.state.clickedFilm}
          />
        )
      } else if (this.state.view === 'showUserHomeView') {
  	  	return (
          <UserHome
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            allFilms={this.state.allFilms}
            allFriends={this.state.allFriends}
            handleHomeClick={this.handleHomeClick}
            handleFilmClick={this.handleFilmClick}
            handleUserClick={this.handleUserClick}
            handleLogOutClick={this.handleLogOutClick}
          />
        )
      } else if (this.state.view === 'showUserView') {
        return (
          <UserProfile
            handleHomeClick={this.handleHomeClick}
            handleLogOutClick={this.handleLogOutClick}
            handleFilmClick={this.handleFilmClick}
            handleUserClick={this.handleUserClick}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            user={this.state.clickedUser}
          />
        )
      }
	  } else {
	    return ( <SignUp handleLogInClick={this.handleLogInClick} /> )
	  }


  }
}

export default App;