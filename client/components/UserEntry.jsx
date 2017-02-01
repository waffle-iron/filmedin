import React from 'react';


var UserEntry = ({handleUserClick, user}) => (
	<div className="user-entry" onClick={() => handleUserClick(user)}>
    <div>
      {user.firstName} {user.lastName}
    </div>
      <div>DOB: {user.DOB}</div>
  </div>
)



export default UserEntry;