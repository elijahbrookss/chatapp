import '../component-stylesheets/Channels.scss'
import React from 'react';
import UserList from './UserList';
import MessageContainer from './MessageContainer';
import MessageForm from '../components/MessageForm';
import { withRouter } from "react-router";


const CHANNEL_API = "http://localhost:3001/channels";
const USERS_API = "http://localhost:3001/current-user"
const MESSAGES_API = "http://localhost:3001/messages"
const authToken = localStorage.getItem("auth_key");
const headerKey = "Authorization";

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
    fetch(USERS_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        [headerKey]: authToken
      }
    })
    .then(response => response.json())
    .then(user=>{
      this.user = user
    });
  }

  fetchChannel = id => {
    fetch(CHANNEL_API+`/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        [headerKey]: authToken
      }
    })
    .then(resp => resp.json())
    .then(channelObj => {
      const suffix = "'s chat"
      this.setState({
        messages: channelObj.messages,
        users: [channelObj.channel_owner,...channelObj.users], 
        chatName: channelObj.channel_owner.username + suffix
      })
    })
  }

  newMessage = (e) => {
    e.preventDefault();
    const messages = this.state.messages;
    const message = {
      content: e.target.elements[0].value,
      user_id: this.user.id,
      channel_id: this.channelId
    }
    e.target.reset();
    fetch(MESSAGES_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [headerKey]: authToken
      },
      body: JSON.stringify(message)
    }).then(response=> response.json())
    .then(message=>this.setState({messages: [...messages, message]}))
  }

  render() {

    return(
      <div className='container' ng-cloak ng-app="chatApp">
        <h1> {this.state.chatName} </h1>
        <div className='chatbox' ng-controller="MessageCtrl as chatMessage">
          <UserList users={this.state.users} />
          <MessageContainer messages={this.state.messages} />
          <MessageForm newMessage={this.newMessage}  />
        </div>
      </div>
    )
  }
}

export default Channel;
