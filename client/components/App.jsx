import axios from 'axios';
import React from 'react';
import SignUp from './SignUp';
import UserHome from './UserHome';
import FilmProfile from './FilmProfile';
import UserProfile from './UserProfile';
import exampleVideoData from './exampleVideoData';
import exampleFriendData from './exampleFriendData';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    	isLoggedIn: false,
      allFilms: exampleVideoData,
      allFriends: exampleFriendData,
      clickedFilm: {},
      clickedUser: {},
      view: ''
    }
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this)
    this.handleFilmClick = this.handleFilmClick.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.handleUserClick = this.handleUserClick.bind(this)
  }


  toggleLoggedIn() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
      view: 'showUserHomeView'
    })
  }

  handleUserClick(user) {
    console.log('current user: ', user);
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
    //include token here
    // var config = {
    //   headers: {'x-access-token': 'Header-Value'}
    // };
    // axios.get('http://127.0.0.1:5000/home', config).then()
  }

  render() {

	  if (this.state.isLoggedIn) {
      if (this.state.view === 'showFilmView') {
        return (
          <FilmProfile
            handleHomeClick={this.handleHomeClick}
            handleUserClick={this.handleUserClick}
            toggleLoggedIn={this.toggleLoggedIn}
            film={this.state.clickedFilm}
          />
        )
      } else if (this.state.view === 'showUserHomeView') {
  	  	return (
          <UserHome
            handleHomeClick={this.handleHomeClick}
            handleFilmClick={this.handleFilmClick}
            handleUserClick={this.handleUserClick}
            toggleLoggedIn={this.toggleLoggedIn}
            allFilms={this.state.allFilms}
            allFriends={this.state.allFriends}
          />
        )
      } else if (this.state.view === 'showUserView') {
        return (
          <UserProfile
            handleHomeClick={this.handleHomeClick}
            toggleLoggedIn={this.toggleLoggedIn}
            handleFilmClick={this.handleFilmClick}
            handleUserClick={this.handleUserClick}
            user={this.state.clickedUser}
          />
        )
      }
	  } else {
	    return ( <SignUp toggleLoggedIn={this.toggleLoggedIn} /> )
	  }


  }
}

export default App;