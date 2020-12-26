import '../component-stylesheets/Channels.scss'
import React from 'react';
import UserList from './UserList';
import MessageContainer from './MessageContainer';
import MessageForm from '../components/MessageForm';
import ContextMenu from '../components/ContextMenu';
import { ActionCableConsumer } from 'react-actioncable-provider';

import ChannelAdapters from '../adapters/ChannelAdapters'

const chatbox = document.querySelector(".chatbox__messages");

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
    editMode: false,
    initialized: false
  }
  channelId = this.props.match.params.id;
  user = {};
  channelOwner = {};


  componentDidMount(){
    this.fetchChannel(this.channelId);
    this.fetchUser();
    document.onclick = this.hideContextMenu;
    this.setState({initialized: true});
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
      const messages = channelObj.messages.sort((a,b) =>  new Date(a.created_at) - new Date(b.created_at));
      this.setState({
        messages,
        users: [...channelObj.users, channelObj.channel_owner],
        chatName: channelObj.channel_owner.username + suffix
      })
    })
  }

  componentDidUpdate(){
    if(chatbox){
      chatbox.scrollTop = chatbox.scrollHeight
    }
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

  renderNewMessage = (message) => {
    console.log(message)
    message = JSON.parse(message)
    const messages = this.state.messages;

    if (!messages.find(cmessage => cmessage.id === message.id)){
      this.setState({messages: [...messages, message]});
    }
  }

  createNewMessage = (e) => {
    const message = {
      content: e.target.elements[0].value,
      user_id: this.user.id,
      channel_id: this.channelId
    }
    e.target.reset();
    ChannelAdapters.createMessage(message)
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
      console.log(this.state.messageClicked);
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
      {this.state.initialized ? null :       <ActionCableConsumer
              channel={{ channel: 'MessagesChannel' }}
              onReceived={this.renderNewMessage}
            /> }
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
