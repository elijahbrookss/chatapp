import React from 'react';
import UserCard from '../components/User';
import ChannelAdapters from '../adapters/ChannelAdapters';

class UserList extends React.Component {

  state = {
    displayUserList: false,
    allUsers: [],
    channelUsers: []
  }

  channelId = this.props.channelId;

  componentDidMount(){
    ChannelAdapters.fetchAllUsers()
    .then(response => response.json())
    .then(allUsers => this.setState({allUsers}))

    ChannelAdapters.fetchChannel(this.channelId)
    .then(response => response.json())
    .then(channelObj => {
      const channelUsers = [...channelObj.users, channelObj.channel_owner];
      this.setState({channelUsers})
      console.log(channelUsers)
    })
  }

  changeUserList = (e) => {
    const displayUserList = this.state.displayUserList;
    this.setState({displayUserList: !displayUserList});
  }

  isUserAdded = (user) => {
    let userFound = false;
    this.state.channelUsers.forEach(addedUser => {
      if (user.id === addedUser.id){
        userFound = true;
      }
    });
    return userFound;
  }

  addUserToChannel = (user) => {
    const channel = this.props.channel;
    ChannelAdapters.inviteUserToChannel(user, channel)
    .then(() => {
      this.setState({
        displayUserList: false,
        allUsers: this.state.allUsers.filter(auser=> auser.id !== user.id),
        channelUsers: [...this.state.channelUsers, user]
      });
    })
  }

  render(){
    const userList = [];

    this.state.allUsers.forEach(user=> {
      if (!this.isUserAdded(user)){
        userList.push(
          <div className="item">
            <button onClick={()=>this.addUserToChannel(user)}>
              <i className="fa fa-user-o"></i> {user.username}
            </button>
          </div>
        );
      }
    })

    return(
      <>
      <button id="inviteButton" onClick={this.changeUserList} >
        <i className="fa fa-plus" aria-hidden="true"></i>
        Invite Users
      </button>
      {this.state.displayUserList ?
        <div id="userListMenu">{userList}</div>:
        null
      }
      <div className='chatbox__user-list'>
        <h1>User list</h1>
        {this.state.channelUsers.map(user=> <UserCard
          key={user.id}
          user={user}
          /> )
        }
      </div>
      </>
    );
  }
}

export default UserList
