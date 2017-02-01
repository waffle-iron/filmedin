import React from 'react';
import helpers from '../lib/helpers';
import SearchUserList from './SearchUserList';
import axios from 'axios';

class SearchUser extends React.Component{
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <SearchUserList
        allFriends={this.props.search}
        handleUserClick={this.props.handleUserClick}
        addFriend={this.props.addFriend}
      />
      )
  }
}

export default SearchUser