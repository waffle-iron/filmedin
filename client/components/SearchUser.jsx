import React from 'react';
import helpers from '../lib/helpers';
import UserList from './UserList';
import axios from 'axios';

class SearchUser extends React.Component{
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <UserList
        allFriends={this.props.search}
        handleUserClick={this.props.handleUserClick}
      />
      )
  }
}

export default SearchUser