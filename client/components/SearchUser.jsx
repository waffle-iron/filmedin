import React from 'react';
import helpers from '../lib/helpers';
import UserList from './UserList';
import axios from 'axios';

class SearchUser extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
  }
  componentDidMount () {
    console.log('props.search: ',this.props.search)
    helpers.searchProfile(this.props.search).then(friends => {
      console.log('friends', friends)
      this.setState({friends: friends});
    })
  }
  render () {
    return (
      <UserList
        allFriends={this.state.friends}
        handleUserClick={this.props.handleUserClick}
      />
      )
  }
}

export default SearchUser