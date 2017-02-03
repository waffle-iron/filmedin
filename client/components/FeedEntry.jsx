import React from 'react';

var FeedEntry = ({handleFilmClick, handleUserClick, feed}) => (
  <div className="feed-entry"> 
    {console.log(feed)}
    <div className="feed-entry-info">
      <a href="#" onClick={() => {handleUserClick(id)}}>firstName lastName</a> rated <a href="#" onClick={() => {handleFilmClick(filmID)}}>{feed.name}</a> {feed.rating} stars.
    </div>
    <div className="feed-entry-time">{new Date("2017-02-03T05:53:54.000Z").toLocaleTimeString("en-us", {year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}</div>
  </div>

)

export default FeedEntry;