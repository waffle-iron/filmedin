import React from 'react';
import helpers from '../lib/helpers';

class SearchUser extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
  }
  componentWillMount () {
    helpers.searchProfile(this.props.search).then(friends => {
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