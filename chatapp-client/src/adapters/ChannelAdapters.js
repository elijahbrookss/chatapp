const localHost = "http://localhost:3001";
const channelRoute = localHost+"/channels";
const currentUserRoute = localHost+"/current-user";
const messagesRoute = localHost+"/messages";
const channelsRoute = localHost+"/channels";

const headerKey = "Authorization";
const authToken = localStorage.getItem("auth_key");

const header = {
  "Content-Type": "application/json",
  [headerKey]: authToken
}

class ChannelAdapters {

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

  static editChatName(channel){
    const id = channel.id;
    return fetch(channelsRoute+`/${id}`, {
      method: "PUT",
      headers: header,
      body: JSON.stringify({channel})
    })
  }

}

export default ChannelAdapters;
