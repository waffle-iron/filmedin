import React from 'react';
import helpers from '../lib/helpers';

class SearchFilm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      films: []
    }
  }
  componentWillMount () {
    helpers.searchFilm(this.props.search).then(films => {
      this.setState({films: films});
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