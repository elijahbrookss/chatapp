const localHost = "http://localhost:3001";
const channelRoute = localHost+"/channels";
const currentUserRoute = localHost+"/current-user";
const messagesRoute = localHost+"/messages";

const headerKey = "Authorization";
const authToken = localStorage.getItem("auth_key");

class ChannelAdapters {

  static fetchUser(){
    return fetch(currentUserRoute, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        [headerKey]: authToken
      }
    })
  }

  static fetchChannel(id){
    return fetch(channelRoute+`/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        [headerKey]: authToken
      }
    })
  }

  static createMessage(message){
    return fetch(messagesRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [headerKey]: authToken
      },
      body: JSON.stringify(message)
    })
  }

}

export default ChannelAdapters;
