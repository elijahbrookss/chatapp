import '../component-stylesheets/Channels.scss'
import React from 'react';
import UserList from './UserList';
import MessageContainer from './MessageContainer';
import MessageForm from '../components/MessageForm';
import ContextMenu from '../components/ContextMenu';
import Header from '../components/Header';
import ActionCable, { ActionCable as ac} from 'actioncable';
import ChannelAdapters from '../adapters/ChannelAdapters';

const cable = ActionCable.createConsumer('ws://localhost:3001/cable')

class Channel extends React.Component {
  state = {
    messages: [],
    users: [],
    displayContextMenu: false,
    messageClicked: {
      content: undefined
    },
    messageEvent: {},
    editMode: false,
  }

  channelId = this.props.match.params.id;
  user = {};
  channelOwner = {};

  componentDidMount(){
    this.fetchChannel(this.channelId);
    this.fetchUser();
    this.createSubscription();
    document.onclick = this.hideContextMenu;
  }


  fixChat = () => {
    const chatbox = document.querySelector(".chatbox__messages");
    chatbox.scrollTop = chatbox.scrollHeight;
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
      this.channelOwner = channelObj.channel_owner;
      const messages = channelObj.messages.sort((a,b) =>  new Date(a.created_at) - new Date(b.created_at));
      this.setState({
        messages,
        users: [...channelObj.users, channelObj.channel_owner],
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

  createSubscription = () => {
    cable.subscriptions.create(
      { channel: 'MessagesChannel',
        channel_id: this.channelId,
     },
      { received: messages => this.renderChangesInMessages(messages) }
    )
  }

  renderChangesInMessages = (messages) => {
    const oldMessages = this.state.messages;
    messages = JSON.parse(messages);
    messages = messages.sort((a,b) =>  new Date(a.created_at) - new Date(b.created_at));
    this.setState({messages});
    if(oldMessages.length < messages.length){this.fixChat()};
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
  }

  switchFormMode = (mode) => {
    this.setState({editMode: mode});
  }

  editMessage = (message) => {
    ChannelAdapters.editMessage(message)
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
    console.log(this.state.messageEvent);
    const contextMenu = document.querySelector("#contextMenu");
    contextMenu.style.left = this.state.messageEvent.pageX + "px";
    contextMenu.style.top = this.state.messageEvent.pageY  + "px";
  }

  render() {
    const displayContextMenu = this.state.displayContextMenu;
    return(
      <>
      <ac
        channel={{
          channel: 'MessagesChannel',
          channel_id: this.channelId,
       }}
      />

      <div className='container' ng-cloak="true" ng-app="chatApp">

        <Header channelOwner={this.channelOwner} />

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
