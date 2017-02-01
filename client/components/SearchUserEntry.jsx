import React from 'react';


var SearchUserEntry = ({handleUserClick, addFriend, user}) => (
  <div className="user-entry" >
    <div onClick={() => handleUserClick(user)}>{user.firstName} {user.lastName}</div>
    <div>DOB: {user.DOB}</div>
    <div>
      <button onClick={() => addFriend(user)}>Add</button>
    </div>
  </div>
)



export default SearchUserEntry;