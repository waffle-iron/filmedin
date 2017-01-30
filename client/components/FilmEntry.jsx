import React from 'react';

class FilmEntry extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<span>A Single Film Entry</span><br />
				<img src="link from get request" /><br />
				<a href="link to film page">Film Title</a>
			</div>
			)
	}
}

export default FilmEntry;