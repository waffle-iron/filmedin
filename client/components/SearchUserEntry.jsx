import React from 'react';


var SearchUserEntry = ({handleUserClick, addFriend, user}) => (
  <div className="user-entry" >
    <span className="addFriend">
      <button className="addFriend-button" onClick={() => addFriend(user)}><span className="glyphicon glyphicon-plus"></span></button>
    </span>
    <span className="user-name" onClick={() => handleUserClick(user)}>{user.firstName} {user.lastName}    </span>
    <span className="user-email">{user.email}</span>

  </div>
)



export default SearchUserEntry;