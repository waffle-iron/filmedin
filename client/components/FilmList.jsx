import React from 'react';
import FilmEntry from './FilmEntry';


var FilmList = ({allFilms, allFriends}) => (
	<div>
		{console.log('allFilms: ', allFilms)}
		{allFilms.map(film => <FilmEntry film={film} /> )}
	</div>
)

{/*
class FilmList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>A list of all film entries
				<FilmEntry />
			</div>
			)
	}
}
*/}

export default FilmList;