import { API_ROOT } from '../apiRoot'

// const localHost = "http://localhost:3001";
const channelRoute = API_ROOT+"/channels";
const currentUserRoute = API_ROOT+"/current-user";
const messagesRoute = API_ROOT+"/messages";
const channelsRoute = API_ROOT+"/channels";
const usersRoute = API_ROOT+"/users";
const userChannelRoute = API_ROOT+'/user_channels';
const reactionsRoute = API_ROOT+'/reactions'

const headerKey = "Authorization";

const header = {
  "Content-Type": "application/json",
  [headerKey]: localStorage.getItem("auth_key")
}

class ChannelAdapters {

  static logoutCurrentUser() {
    localStorage.clear();
  }

  static isLoggedIn(){
    const authToken = localStorage.getItem("auth_key");
    return authToken==="undefined" ? false : authToken;
  }

  static fetchUser(){
    return fetch(currentUserRoute, {
      method: "GET",
      headers: header
    })
  }

  static fetchChannel(id){
    return fetch(channelRoute+`/${id}`, {
      method: "GET",
      headers: header
    })
  }

  static createMessage(message){
    return fetch(messagesRoute, {
      method: "POST",
      headers: header,
      body: JSON.stringify(message)
    })
  }

  static deleteMessage(message){
    const id = message.id
    return fetch(messagesRoute+`/${id}`, {
      method: "DELETE",
      headers: header
    })
  }

  static editMessage(message){
    const id= message.id;
    return fetch(messagesRoute+`/${id}`,{
      method: "PATCH",
      headers: header,
      body: JSON.stringify(message)
    })
  }

  static updateChannel(channel){
    const id = channel.id;
    return fetch(channelsRoute+`/${id}`, {
      method: "PUT",
      headers: header,
      body: JSON.stringify({channel})
    })
  }

  static fetchAllUsers(){
    return fetch(usersRoute, {
      method: "GET",
      headers: header
    })
  }

  static inviteUserToChannel(user, channel){
    return fetch(userChannelRoute, {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        user_id: user.id,
        channel_id: channel.id
      })
    })
  }

  static newChannel(){
    return fetch(channelRoute, {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        name: "New Channel",
      })
    })
  }

  static deleteChannel(channel){
    const id = channel.id;
    return fetch(channelRoute+`/${id}`, {
      method: "DELETE",
      headers: header,
    })
  }

  static leaveChannel(channel, user){
    return fetch(userChannelRoute+"/leave", {
      method: "DELETE",
      headers: header,
      body: JSON.stringify({
        channel_id: channel.id,
        user_id: user.id
      })
    })
  }

  static createReaction(message, emoji, currentUser){
    return fetch(reactionsRoute, {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        emoji,
        message_id: message.id,
        user_id: currentUser.id
      })
    })
  }

  static deleteReaction(reaction){
    return fetch(reactionsRoute+`/${reaction.id}`, {
      method: "DELETE",
      headers: header
    })
  }
}

export default ChannelAdapters;
