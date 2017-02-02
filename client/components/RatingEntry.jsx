import React from 'react';

var RatingEntry = ({rating}) => (
  <div className="rating-entry">
    {console.log('rating', rating)}
    {rating.firstName}
    {rating.rating}
  </div>
)

export default RatingEntry;
