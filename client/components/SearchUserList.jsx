import React from 'react';
import SearchUserEntry from './SearchUserEntry';


var SearchUserList = ({handleUserClick, allFriends, addFriend}) => (
  <div className="search-user-list">

    {allFriends.map(user => 
      <SearchUserEntry 
        handleUserClick={handleUserClick}
        addFriend={addFriend}
        user={user} 
      /> )}
  </div>
)


export default SearchUserList;