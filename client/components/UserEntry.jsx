import React from 'react';


var UserEntry = ({handleUserClick, user}) => (
	<div className="user-entry" onClick={() => handleUserClick(user)}>
    <div>
      {user.firstname} {user.lastname}
    </div>
      <div>Username: {user.username}</div>
  </div>
)



export default UserEntry;