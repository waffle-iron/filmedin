import React from 'react';
import UserEntry from './UserEntry';


var FriendUserList = ({handleUserClick, allFriends}) => (
  <div className="friend-user-list">
    {allFriends.map(user => 
      <UserEntry 
        handleUserClick={handleUserClick}
        user={user} 
      /> )}
  </div>
)


export default FriendUserList;