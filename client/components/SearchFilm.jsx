import React from 'react';
import helpers from '../lib/helpers';
import FilmList from './FilmList';
import axios from 'axios';

class SearchFilm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      films: []
    }
  }
  componentDidMount () {
    console.log(this.props.search)
    helpers.searchFilm(this.props.search).then(films => {
      console.log('films', films)
      this.setState({films: films});
    }).catch(err => {
      console.log('error with search film', err)
    })
  }
  render () {
    return (
      <FilmList
        allFilms={this.state.films}
        handleFilmClick={this.props.handleFilmClick}
      />
      )
  }
}

export default SearchFilm