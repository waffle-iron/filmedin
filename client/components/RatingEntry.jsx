import React from 'react';
import Rating from 'react-rating';
var RatingEntry = ({rating}) => (
  <tr className="rating-entry">
    <td>{rating.firstName}</td>
    <td><Rating className="ratingStar" id="rating-img" empty="fa fa-star-o fa-2x" full="fa fa-star fa-2x" initialRate={rating.rating} readonly={true}/></td>
  </tr>
)

export default RatingEntry;
