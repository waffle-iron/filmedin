import React from 'react';
import NavBar from './NavBar';
import Rating from 'react-rating';
import RatingList from './RatingList';
import helpers from '../lib/helpers';
import Modal from 'react-bootstrap/lib/Modal';
// import FontAwesome from 'font-awesome';
//<iframe src={this.props.film.trailer} className="trailer"></iframe>
class FilmProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		}
		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
	}
  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
	render () {
		return (
		<div className="film-profile">
			<div className="filmHeader">
				{console.log(this.props.film)}
				<div className="filmTitle">{this.props.film.name}</div>
				<div className="filmBanner">
					<span className="genre">Genre: {this.props.film.genre}</span>
					<span className="releaseDate">Release Date: {new Date(this.props.film.releaseDate).toLocaleDateString("en-US", {weekday: "long", year: "numeric", month: "short",day: "numeric"})}</span>
					<span className="runtime">Runtime: {this.props.film.runtime}</span>
				</div>
			</div>
			<img className="filmPoster" src={this.props.film.posterURL} alt="" />
			<div className="ratingBlock">
				<div className="yourRatingBlock">
					<span className="yourRating">Rate: </span>
					<Rating className="ratingStar" id="rating-img" empty="fa fa-star-o fa-2x" full="fa fa-star fa-2x" initialRate={this.props.film.myRating ? this.props.film.myRating.rating : 0} onClick={(rate, e) => {this.props.rateFilm (rate, this.props.film.id)}}/>
				</div>

					<RatingList 
						allFriendsRatings={this.props.film.friendRatings}
					/>
			</div>
      <Modal show={this.state.showModal}  dialogClassName="my-modal" onHide={this.close} closeButton>
        <Modal.Body>
        	<iframe src={this.props.film.trailer} className="trailer"></iframe>
				</Modal.Body>
      </Modal>
			{
				(this.props.film.trailer) ? (
					<button className="trailer-button" onClick={this.open}>Watch Trailer</button>
				) : (<span />)
			}
			<div className="streamLinks">
				<a href={this.props.film.netflix} className="streamA" target="_blank"><img className={"streamImg " + (this.props.film.netflix ? "streamHighlight" : "streamOpaque")} src="assets/netflix_icon.jpg"/></a>
				<a href={this.props.film.hbo} className="streamA"  target="_blank"><img className={"streamImg " + (this.props.film.hbo ? "streamHighlight" : "streamOpaque")} src="assets/hbo_icon.jpg"/></a>
				<a href={this.props.film.amazon} className="streamA" target="_blank"><img className={"streamImg " + (this.props.film.amazon ? "streamHighlight" : "streamOpaque")}  src="assets/amazon_icon.jpg"/></a>
				<a href={this.props.film.itunes} className="streamA" target="_blank"><img className={"streamImg " + (this.props.film.itunes ? "streamHighlight" : "streamOpaque")} src="assets/itunes_icon.jpg"/></a>
			</div>
			<div className="resourceLinks">
				<a href={'http://www.rottentomatoes.com/m/' + this.props.film.rt} className="streamA" target="_blank"><img className={"streamImg " + (this.props.film.rt ? "streamHighlight" : "streamOpaque")} src="assets/rottentomatoes_icon.jpg"/></a>
				<a href={'https://en.wikipedia.org/w/index.php?curid=' + this.props.film.imdb} className="streamA"  target="_blank"><img className={"streamImg " + (this.props.film.wiki ? "streamHighlight" : "streamOpaque")} src="assets/wikipedia_icon.jpg"/></a>
				<a href={'http://www.imdb.com/title/' + this.props.film.wiki} className="streamA" target="_blank"><img className={"streamImg " + (this.props.film.imdb ? "streamHighlight" : "streamOpaque")}  src="assets/imdb_icon.jpg"/></a>
			</div>

			
			<div className="filmInfo">
				<div><b>Overview:</b> {this.props.film.overview}</div>
				<br/>
				<div><b>Directors:</b> {this.props.film.directors}</div>
				<br/>
				<div><b>Writers:</b> {this.props.film.writers}</div>
				<br/>
			</div>

			<div>
				<table className="actors-list table table-striped table-hover">
					<thead>
						<tr>
							<th>Character</th>
							<th>Played By</th>
						</tr>
					</thead>
					<tbody>
					{
						helpers.castList(this.props.film.actors).map(actorAndCharacter => {
							return (
								<tr>
									<td>{actorAndCharacter[1]}</td>
									<td>{actorAndCharacter[0]}</td>	
								</tr>
							)
						})
					}
					</tbody>
				</table>
				</div>
		</div>
	)
	}
}

export default FilmProfile

//overview - description
//releaseDate
//directors - string comma deliminated 
//writers - ''
//actors - string, actorname:charactername;
//trailer - embed link
//rt - rotten tomatoes id rottentomatoes.com/m/<rt> - link to rotten toms page
//netflix - link to netflix stream, if empty no link
//hbo - ''
//amazon - ''
//itunes - '' - purchase, others for streaming
//friendsRatings - arr of obj
