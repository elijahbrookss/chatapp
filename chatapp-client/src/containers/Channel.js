import '../component-stylesheets/Channels.scss'
import React from 'react';
import UserList from './UserList';
import MessageContainer from './MessageContainer';
import MessageForm from '../components/MessageForm';
import ContextMenu from '../components/ContextMenu';

import ChannelAdapters from '../adapters/ChannelAdapters'

class Channel extends React.Component {

  state = {
    messages: [],
    users: [],
    chatName: "Are you a hacker? 😂",
    displayContextMenu: false,
    messageClicked: {}
  }

  channelId = this.props.match.params.id;
  user = {};
  channelOwner = {};

  componentDidMount(){
    this.fetchChannel(this.channelId);
    this.fetchUser();
    this.domClickedEvent();
  }

  fetchUser = () => {
    ChannelAdapters.fetchUser()
    .then(response => response.json())
    .then(user=>{
      this.user = user
    });
  }

  fetchChannel = id => {
    ChannelAdapters.fetchChannel(id)
    .then(resp => resp.json())
    .then(channelObj => {
      const suffix = "'s chat";
      this.channelOwner = channelObj.channel_owner;
      this.setState({
        messages: channelObj.messages,
        users: [...channelObj.users, channelObj.channel_owner],
        chatName: channelObj.channel_owner.username + suffix
      })
    })
  }

  newMessage = (e) => {
    e.preventDefault();
    const chatbox = e.nativeEvent.path[1].childNodes[1].childNodes[1];
    const messages = this.state.messages;

    const message = {
      content: e.target.elements[0].value,
      user_id: this.user.id,
      channel_id: this.channelId
    }
    e.target.reset();
    ChannelAdapters.createMessage(message)
    .then(response=> response.json())
    .then(message=>{
      this.setState({messages: [...messages, message]})
      chatbox.scrollTop = chatbox.scrollHeight;
      })
  }

  deleteMessage = (message) => {

    ChannelAdapters.deleteMessage(message)
    .then(() => {
      const messageId = parseInt(message.getAttribute("datasetid"));
      const messages =  this.state.messages.filter(currentMessage=> currentMessage.id !== messageId);
      this.setState({messages})
    })

  }

  changeDisplayContextMenu = (e, messageUser) => {
    e.preventDefault();
    if (this.isPermitted(messageUser)){
      if (this.state.displayContextMenu) {
        this.hideContextMenu();
      }else {
        this.setState({messageClicked: e})
        this.displayContextMenu();
      }
    }
  }

  displayContextMenu = () => {
    this.setState({displayContextMenu: true});
  }

  hideContextMenu = () => {
    this.setState({displayContextMenu: false});
  }

  isPermitted = (messageUser) => {
    const channelOwner = this.channelOwner;
    const currentUser = this.user;
    if (messageUser.id === currentUser.id || currentUser.id === channelOwner.id){
      return true
    }
    return false
  }

  positionContextMenu = () => {
    const contextMenu = document.querySelector("#contextMenu");
    contextMenu.style.display = "block";
    contextMenu.style.left = this.state.messageClicked.pageX + "px";
    contextMenu.style.top = this.state.messageClicked.pageY + "px";

  }

  domClickedEvent = () => {
    document.onclick = this.hideContextMenu;
  }


  render() {
    const displayContextMenu = this.state.displayContextMenu;
    return(
      <>
      <div className='container' ng-cloak="true" ng-app="chatApp">
        <h1> {this.state.chatName} </h1>
        <div className='chatbox' ng-controller="MessageCtrl as chatMessage">
          <UserList users={this.state.users} />
          <MessageContainer
            user={this.user}
            messages={this.state.messages}
            changeDisplayContextMenu={this.changeDisplayContextMenu}
          />
        </div>
        <MessageForm newMessage={this.newMessage}  />
      </div>
      {displayContextMenu ? <ContextMenu
          deleteMessage={this.deleteMessage}
          messageClicked={this.state.messageClicked}
          positionContextMenu={this.positionContextMenu}
        /> : null}
      </>
    )
  }
}

export default Channel;
