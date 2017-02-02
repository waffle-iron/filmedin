import React from 'react';
import RatingEntry from './RatingEntry';

var RatingList = ({allFriendsRatings}) => (

  <div className="rating-list">
  {allFriendsRatings.map(rating =>
    <RatingEntry rating={rating}/>
    )}
  </div>
)

export default RatingList;