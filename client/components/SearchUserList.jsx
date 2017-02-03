import React from 'react';
import SearchUserEntry from './SearchUserEntry';


var SearchUserList = ({handleUserClick, allFriends, addFriend, curFriends}) => (
  <div className="search-user-list">
    {allFriends.map(user => 
      <SearchUserEntry 
        isFriend={curFriends.includes(user.id)}
        handleUserClick={handleUserClick}
        addFriend={addFriend}
        user={user} 
      /> )}
  </div>
)


export default SearchUserList;