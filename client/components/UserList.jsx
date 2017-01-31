import React from 'react';
import UserEntry from './UserEntry';


var UserList = ({handleUserClick, allFriends}) => (
	<div className="user-list">
		{console.log('allFriends: ', allFriends)}
		{allFriends.map(user => 
			<UserEntry 
				handleUserClick={handleUserClick}
				user={user} 
			/> )}
	</div>
)


export default UserList;