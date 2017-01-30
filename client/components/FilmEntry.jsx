import React from 'react';


var FilmEntry = ({film}) => (
	<div>
    <div>
      <img src={film.snippet.thumbnails.default.url} alt="" />
    </div>
      <div>{film.snippet.title}</div>
      <div>{film.snippet.description}</div>
  </div>
)



{/*
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
*/}

export default FilmEntry;