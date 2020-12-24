import '../component-stylesheets/Channels.scss'
import React from 'react';
import UserList from './UserList';
import MessageContainer from './MessageContainer';
import MessageForm from '../components/MessageForm';
import ChannelAdapters from '../adapters/ChannelAdapters'

class Channel extends React.Component {

  state = {
    messages: [],
    users: [],
    chatName: "Are you a hacker? 😂",
  }

  channelId = this.props.match.params.id;
  user = {};

  componentDidMount(){
    this.fetchChannel(this.channelId);
    this.fetchUser();
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
      const suffix = "'s chat"
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

  render() {

    return(
      <div className='container' ng-cloak ng-app="chatApp">
        <h1> {this.state.chatName} </h1>
        <div className='chatbox' ng-controller="MessageCtrl as chatMessage">
          <UserList users={this.state.users} />
          <MessageContainer user={this.user} messages={this.state.messages} />
        </div>
        <MessageForm newMessage={this.newMessage}  />
      </div>
    )
  }
}

export default Channel;
