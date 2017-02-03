import React from 'react';
import helpers from '../lib/helpers';
import SearchUserList from './SearchUserList';
import axios from 'axios';

class SearchUser extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
  }
  componentWillMount () {
    var friendIDs = this.props.friends ? this.props.friends.map(friend => friend.ID) : [];
    this.setState({friends: friendIDs});
  }
  render () {
    return (
      <SearchUserList
        curFriends={this.state.friends}
        allFriends={this.props.search}
        handleUserClick={this.props.handleUserClick}
        addFriend={this.props.addFriend}
      />
      )
  }
}

export default SearchUser