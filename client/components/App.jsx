import axios from 'axios';
import React from 'react';
import SignUp from './SignUp';
import UserHome from './UserHome';
import FilmProfile from './FilmProfile';
import UserProfile from './UserProfile';
import exampleVideoData from './exampleVideoData';
import exampleFriendData from './exampleFriendData';
import helpers from '../lib/helpers';
import SearchUser from './SearchUser';
import SearchFilm from './SearchFilm';
import NavBar from './NavBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileID: '',
    	isLoggedIn: false,
      firstName: '',
      lastName: '',
      allFilms: exampleVideoData,
      allFriends: exampleFriendData,
      clickedFilm: {},
      clickedUser: {},
      view: '',
      searchUser: [],
      searchFilm: []
    }

    this.handleSearchUserClick = this.handleSearchUserClick.bind(this)
    this.handleSearchFilmClick = this.handleSearchFilmClick.bind(this)
    this.handleFilmClick = this.handleFilmClick.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.handleUserClick = this.handleUserClick.bind(this)
    this.handleLogInClick = this.handleLogInClick.bind(this)
    this.handleLogOutClick = this.handleLogOutClick.bind(this)
  }

  handleSearchUserClick(searchUser) {
    this.setState({
      searchUser: searchUser,
      view: 'showSearchUserView'
    })
  }

  handleSearchFilmClick(searchFilm) {
    this.setState({
      searchFilm: searchFilm,
      view: 'showSearchFilmView'
    })
  }


  handleLogOutClick() {
    window.localStorage.removeItem('filmedInToken');
    this.setState({
      isLoggedIn: false,
      view: ''
    })
  }

  handleLogInClick(username) {
    helpers.getHome().then(response => {
      console.log('response: ', response)
      // helpers.getHome().then(response => {
      //   console.log(response);
      // });
      // var response = {};
      // response.data = {
      //   id: 12345,
      //   firstName: 'bob',
      //   lastName: 'bobby',
      //   DOB: "1985-01-01",
      //   friends: [{
      //     ID: 1,
      //     firstName: 'joe',
      //     lastName: 'joey',
      //     DOB: "1985-01-01"
      //   },
      //   {
      //     ID: 2,
      //     firstName: 'jim',
      //     lastName: 'jimmy',
      //     DOB: "1985-01-01"
      //   },
      //   {
      //     ID: 3,
      //     firstName: 'steve',
      //     lastName: 'stevey',
      //     DOB: "1985-01-01"
      //   }],
      //   ratings: [
      //     {
      //       guideBox: 135934,
      //       rating: 1,
      //       review: 'it sucked',
      //       name: 'die hard',
      //       genre: 'love, romance',
      //       posterURL: 'https://upload.wikimedia.org/wikipedia/en/7/7e/Die_hard.jpg'
      //     },
      //     {
      //       guideBox: 135934,
      //       rating: 3,
      //       review: 'it was so so',
      //       name: 'die hard',
      //       genre: 'love, romance',
      //       posterURL: 'https://upload.wikimedia.org/wikipedia/en/7/7e/Die_hard.jpg'
      //     }
      //   ]
      // }

      this.setState({
        isLoggedIn: true,
        username: username,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        allFriends: response.data.friends,
        allFilms: response.data.ratings,
        view: 'showUserHomeView'
      })
    })
  }


  handleUserClick(user) {
    console.log(user);
    helpers.getProfile((user.id || user.ID)).then(response => {
      this.setState({
        view: 'showUserView',
        clickedUser: response.data
      })
    })
  }

  handleFilmClick(film) {
    helpers.getFilm(film.guideBox).then(response => {
      this.setState({
        view: 'showFilmView',
        clickedFilm: response.data
      })
    })
  }

  handleHomeClick() {
    this.setState({
      view: 'showUserHomeView',
    })
  }

  render() {
	  if (!this.state.isLoggedIn) {
      return ( <SignUp handleLogInClick={this.handleLogInClick} /> )
    } else {
      return (
        <div>
          <NavBar
            handleHomeClick={this.handleHomeClick}
            handleLogOutClick={this.handleLogOutClick}
            searchUser={this.handleSearchUserClick}
            searchFilm={this.handleSearchFilmClick}
          />
          {
            (this.state.view === 'showFilmView') ? (
                <FilmProfile
                  film={this.state.clickedFilm}
                />
            ) : (this.state.view === 'showUserHomeView') ? (
                <UserHome
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  allFilms={this.state.allFilms}
                  allFriends={this.state.allFriends}
                  handleFilmClick={this.handleFilmClick}
                  handleUserClick={this.handleUserClick}
                />
            ) : (this.state.view === 'showUserView') ? (
                <UserProfile
                  handleFilmClick={this.handleFilmClick}
                  handleUserClick={this.handleUserClick}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  user={this.state.clickedUser}
                />              
            ) : (this.state.view === 'showSearchFilmView') ? (
                <SearchFilm
                  search={this.state.searchFilm}
                  handleFilmClick={this.handleFilmClick}
                />               
            ) : (this.state.view === 'showSearchUserView') (
                <SearchUser
                  search={this.state.searchUser}
                  handleUserClick={this.handleUserClick}
                />              
            )
          }
        </div>
      );
    }
  }
}
export default App;