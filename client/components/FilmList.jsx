import React from 'react';
import FilmEntry from './FilmEntry';

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

export default FilmList;