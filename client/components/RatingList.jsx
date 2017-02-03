import React from 'react';
import RatingEntry from './RatingEntry';

var RatingList = ({allFriendsRatings}) => (

  <table className="table table-striped table-hover">
    <thead>
    <tr>
      <th>Name</th>
      <th>Rating</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>Fake</td>
      <td>Test</td>
    </tr>
  {allFriendsRatings.map(rating =>
    <RatingEntry rating={rating}/>
    )}
    </tbody>
  </table>
)

export default RatingList;