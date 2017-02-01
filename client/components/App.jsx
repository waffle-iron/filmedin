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
    // helpers.getHome().then(response => {
      // console.log('response: ', response)
      var response = {};
      response.data = {
        id: 12345,
        firstName: 'bob',
        lastName: 'bobby',
        DOB: "1985-01-01",
        friends: [{
          ID: 1,
          firstName: 'joe',
          lastName: 'joey',
          DOB: "1985-01-01"
        },
        {
          ID: 2,
          firstName: 'jim',
          lastName: 'jimmy',
          DOB: "1985-01-01"
        },
        {
          ID: 3,
          firstName: 'steve',
          lastName: 'stevey',
          DOB: "1985-01-01"
        }],
        ratings: [
          {
            guideBox: 135934,
            rating: 1,
            review: 'it sucked',
            name: 'die hard',
            genre: 'love, romance',
            posterURL: 'https://upload.wikimedia.org/wikipedia/en/7/7e/Die_hard.jpg'
          },
          {
            guideBox: 135934,
            rating: 3,
            review: 'it was so so',
            name: 'die hard',
            genre: 'love, romance',
            posterURL: 'https://upload.wikimedia.org/wikipedia/en/7/7e/Die_hard.jpg'
          }
        ]
      }

      this.setState({
        isLoggedIn: true,
        username: username,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        allFriends: response.data.friends,
        allFilms: response.data.ratings,
        view: 'showUserHomeView'
      })
    // })
  }


  handleUserClick(user) {
    helpers.getProfile(user.ID).then(response => {
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
          <div>
            <NavBar
              handleHomeClick={this.handleHomeClick}
              handleLogOutClick={this.handleLogOutClick}
              searchUser={this.handleSearchUserClick}
              searchFilm={this.handleSearchFilmClick}
            />
          <FilmProfile
            handleHomeClick={this.handleHomeClick}
            handleUserClick={this.handleUserClick}
            handleLogOutClick={this.handleLogOutClick}
            film={this.state.clickedFilm}
          />
        </div>
        )
      } else if (this.state.view === 'showUserHomeView') {
  	  	return (
          <div>
          <NavBar
            handleHomeClick={this.handleHomeClick}
            handleLogOutClick={this.handleLogOutClick}
            searchUser={this.handleSearchUserClick}
            searchFilm={this.handleSearchFilmClick}
          />
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
          </div>
        )
      } else if (this.state.view === 'showUserView') {
        return (
          <div>
            <NavBar
              handleHomeClick={this.handleHomeClick}
              handleLogOutClick={this.handleLogOutClick}
              searchUser={this.handleSearchUserClick}
              searchFilm={this.handleSearchFilmClick}
            />
            <UserProfile
              handleHomeClick={this.handleHomeClick}
              handleLogOutClick={this.handleLogOutClick}
              handleFilmClick={this.handleFilmClick}
              handleUserClick={this.handleUserClick}
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              user={this.state.clickedUser}
            />
          </div>
        )
      } else if (this.state.view === 'showSearchFilmView') {
        console.log('inside showSearchFilmView')
        return (
          <div>
            <NavBar
              handleHomeClick={this.handleHomeClick}
              handleLogOutClick={this.handleLogOutClick}
              searchUser={this.handleSearchUserClick}
              searchFilm={this.handleSearchFilmClick}
            />
            <SearchFilm
              search={this.state.searchFilm}
              handleFilmClick={this.handleFilmClick}
            />
          </div>
        )
    } else if (this.state.view === 'showSearchUserView') {
        return (
          <div>
            <NavBar
              handleHomeClick={this.handleHomeClick}
              handleLogOutClick={this.handleLogOutClick}
              searchUser={this.handleSearchUserClick}
              searchFilm={this.handleSearchFilmClick}
            />
            <SearchUser
              search={this.state.searchUser}
              handleUserClick={this.handleUserClick}
            />
          </div>
        )
      }
    } else {
	    return ( <SignUp handleLogInClick={this.handleLogInClick} /> )
	  }
  }
}
export default App;