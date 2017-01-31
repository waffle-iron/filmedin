import React from 'react';
import SignUp from './SignUp';
import UserHome from './UserHome';
import FilmProfile from './FilmProfile';
import exampleVideoData from './exampleVideoData'
import exampleFriendData from './exampleFriendData'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	isLoggedIn: false,
      allFilms: exampleVideoData,
      allFriends: exampleFriendData,
      clickedFilm: {},
      view: '',
    }
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this)
    this.handleFilmClick = this.handleFilmClick.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
  }


  toggleLoggedIn() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
      view: 'showUserHomeView'
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


  render() {
  	
	  if (this.state.isLoggedIn) {
      if (this.state.view === 'showFilmView') {
        return (
          <FilmProfile 
            handleHomeClick={this.handleHomeClick}
            toggleLoggedIn={this.toggleLoggedIn}
            film={this.state.clickedFilm}
          />
        )
      } else if (this.state.view === 'showUserHomeView') {
  	  	return ( 
          <UserHome 
            handleHomeClick={this.handleHomeClick}
            handleFilmClick={this.handleFilmClick}
            toggleLoggedIn={this.toggleLoggedIn}
            allFilms={this.state.allFilms} 
            allFriends={this.state.allFriends}
          /> 
        )
      }
	  } else {
	    return ( <SignUp toggleLoggedIn={this.toggleLoggedIn} /> )
	  }


  }
}

export default App;