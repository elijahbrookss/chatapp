import React from 'react';
import UserCard from '../components/User';
import ChannelAdapters from '../adapters/ChannelAdapters';

class UserList extends React.Component {

  state = {
    displayUserList: false,
    allUsers: [],
  }

  channelId = this.props.channelId;

  componentDidMount(){
    ChannelAdapters.fetchAllUsers()
    .then(response => response.json())
    .then(allUsers => this.setState({allUsers}))
  }

  changeUserList = (e) => {
    const displayUserList = this.state.displayUserList;
    this.setState({displayUserList: !displayUserList});
  }

  isUserAdded = (user, channelUsers) => {
    let userFound = false;
    channelUsers.forEach(addedUser => {
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
      });
    })
  }

  render(){
    const userList = [];
    const channelObj = this.props.channel;
    const channelUsers = [];
    if(channelObj){
      const channelUsers = [...channelObj.users, channelObj.channel_owner];
    }
    this.state.allUsers.forEach(user=> {
      if (!this.isUserAdded(user, channelUsers)){
        userList.push(
          <div key={user.id} className="item">
            <button onClick={()=>this.addUserToChannel(user)}>
              <i className="fa fa-user-o"></i> {user.username}
            </button>
          </div>
        );
      }
    })

    return(
      <>
      <div className="methods">
        <button className="methodButton" onClick={this.changeUserList} >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
        <button onClick={this.props.startVideoChat} className="methodButton" id="video" >
          <i className="fas fa-video" aria-hidden="true"></i>
        </button>
      </div>

      {this.state.displayUserList ?
        <div id="userListMenu">{userList}</div>:
        null
      }
      <div className='chatbox__user-list'>
        <h1>User list</h1>
        {
          channelUsers ?
          channelUsers.map(user=> <UserCard
          key={user.id}
          user={user}
          /> )

          :
          null
        }
      </div>
      </>
    );
  }
}

export default UserList
