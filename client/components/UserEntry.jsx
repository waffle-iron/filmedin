import React from 'react';


var UserEntry = ({handleUserClick, user}) => (

	<div className="user-entry" onClick={() => handleUserClick(user)}>
      <div className="user-entry-username">
      @{user.username}
    </div>
    <div className="user-entry-name">
      {user.firstName} {user.lastName}
    </div>
      <div className="user-entry-stat">
        <img className="user-entry-logo" src="assets/logo2.png"/>
         {user.count} Movie(s) Rated
      </div>
  </div>
)



export default UserEntry;