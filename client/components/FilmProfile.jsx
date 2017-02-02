import React from 'react';
import NavBar from './NavBar';
import Rating from 'react-rating';
import RatingList from './RatingList';
import helpers from '../lib/helpers';

var FilmProfile = ({film, rateFilm}) => (
		<div className="film-profile">
		{console.log('film: ', film)}
			<h1>{film.name}</h1>
			<br />
			<img src={film.posterURL} alt="" />
			<br />
				{
					(film.trailer) ? (
						<iframe src={film.trailer} width="1000px" height="400px"></iframe>
					) : (<span />)
				}
			<br />
			Links to watch:
			
			{
				(film.netflix) ? (
						<a href={film.netflix} target="_blank">Click here to watch on Netflix</a>
					) : (<span />)
			}

			{
				(film.hbo) ? (
						<a href={film.hbo} target="_blank">Click here to watch on hbo</a>
					) : (<span />)
			}

			{
				(film.amazon) ? (
						<a href={film.amazon} target="_blank">Click here to watch on amazon</a>
					) : (<span />)
			}

			{
				(film.itunes) ? (
						<a href={film.itunes} target="_blank">Click here to watch on itunes</a>
					) : (<span />)
			}

			<div>Release Date: {film.releaseDate}</div>
			<br />
			<div>Overview: {film.overview}</div>
			<br />
			<div>Directors: {film.directors}</div>
			<br />
			<div>Writers: {film.writers}</div>
			<br />
			<div>Cast: 
				<ul className="actors-list">
					{
						helpers.castList(film.actors).map(actorAndCharacter => {
							return (
								<li>
									{console.log(actorAndCharacter)}
									Character: {actorAndCharacter[1]} Played By: {actorAndCharacter[0]}
								</li>
							)
						})
					}
				</ul>
			</div>
			<br />
			<div>
				<a href={'http://www.rottentomatoes.com/m/' + film.rt} target="_blank">Rotten Tomatoes</a>
			</div>

			<br />


			<Rating initialRate={film.myRating.rating} onClick={(rate, e) => {rateFilm (rate, film.id)}}/>
			<div>Your ranking: {film.myRating.rating}</div>
			<br />
			<div>Film Genre:<br />{film.genre}</div>
			<br />
			<div>This will contain links to stream the film</div>
			<br />
			<div>This will contain friends who have ranked the film
				<RatingList 
					allFriendsRatings={film.friendRatings}
				/>
			</div>

		</div>
	)

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
