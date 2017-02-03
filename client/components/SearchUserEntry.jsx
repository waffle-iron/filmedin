import React from 'react';


var SearchUserEntry = ({handleUserClick, addFriend, user, isFriend}) => (
  <div className="user-entry" >
    <span className="addFriend">
      <button className="addFriend-button" onClick={() => {((!isFriend) ? addFriend(user) : console.log('Already Friends'))}}><span className={!isFriend ? "glyphicon glyphicon-plus" : "glyphicon glyphicon-ok"}></span></button>
    </span>
    <span className="user-name" onClick={() => handleUserClick(user)}>{user.firstName} {user.lastName}    </span>
    <span className="user-email">{user.email}</span>
   <span className="user-email">Member since: {new Date(user.createdAt).toLocaleDateString("en-US", {year: "numeric", month: "short",day: "numeric"})}</span>
  </div>
)



export default SearchUserEntry;