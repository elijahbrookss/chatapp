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
    messageClicked: {
      content: undefined
    },
    messageEvent: {},
    editMode: false
  }

  channelId = this.props.match.params.id;
  user = {};
  channelOwner = {};

  componentDidMount(){
    this.fetchChannel(this.channelId);
    this.fetchUser();
    document.onclick = this.hideContextMenu;

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

  formSubmit = (e, content) => {
    e.preventDefault();
    const editMode = this.state.editMode;
    const messageClicked = this.state.messageClicked;
    
    if (editMode){
      this.setState({editMode: false})
      messageClicked.content = content
      this.editMessage(messageClicked);
    }else {
      this.createNewMessage(e);
    }
  }

  createNewMessage = (e) => {
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
      const messages =  this.state.messages.filter(currentMessage=> currentMessage.id !== message.id);
      this.setState({messages})
    })
  }

  switchFormMode = (mode) => {
    this.setState({editMode: mode});
  }

  editMessage = (message) => {
    ChannelAdapters.editMessage(message)
    .then(response => response.json())
    .then(newMessage => {
      const messages = this.state.messages
      const updatedMessage = messages.find(currentMessage => currentMessage.id === message.id);
      updatedMessage.content = newMessage.content;
      this.setState({messages});
    })
  }

  changeDisplayContextMenu = (e, message) => {
    e.preventDefault();
    if (this.isPermitted(message)){
      if (this.state.displayContextMenu) {
        this.hideContextMenu();
      }else {
        this.setState({
          messageClicked: message,
          messageEvent: e
        })
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

  isPermitted = (message) => {
    const channelOwner = this.channelOwner;
    const currentUser = this.user;
    const messageUser = message.user;
    if (messageUser.id === currentUser.id || currentUser.id === channelOwner.id){
      return true
    }
    return false
  }

  positionContextMenu = () => {
    const contextMenu = document.querySelector("#contextMenu");
    contextMenu.style.display = "block";
    contextMenu.style.left = this.state.messageEvent.pageX + "px";
    contextMenu.style.top = this.state.messageEvent.pageY + "px";
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
        <MessageForm
          editMode={this.state.editMode}
          formSubmit={this.formSubmit}
          messageClicked={this.state.messageClicked}
          />
      </div>
      {displayContextMenu ? <ContextMenu
          switchFormMode={this.switchFormMode}
          deleteMessage={this.deleteMessage}
          messageClicked={this.state.messageClicked}
          positionContextMenu={this.positionContextMenu}
        /> : null}
      </>
    )
  }
}

export default Channel;
