import React from 'react';
import SignUp from './SignUp';
import UserProfile from './UserProfile';
import FilmProfile from './FilmProfile';
import exampleVideoData from './exampleVideoData.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	isLoggedIn: false,
      allFilms: exampleVideoData,
      allFriends: [],
      showFilmView: false,
      clickedFilm: {}
    }
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this)
    this.handleFilmClick = this.handleFilmClick.bind(this)
  }

  toggleLoggedIn() {
  	this.setState({
  		isLoggedIn: !this.state.isLoggedIn
  	})
  }

  handleFilmClick(film) {
    this.setState({
      showFilmView: !this.state.showFilmView,
      clickedFilm: film
    })
  }


  render() {
  	
	  if (this.state.isLoggedIn) {
      if (this.state.showFilmView) {
        return (
          <FilmProfile film={this.state.clickedFilm}/>
          )
      } else {
  	  	return ( 
          <UserProfile 
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