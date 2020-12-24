import React from 'react';

const Message = (props) =>{
  const user = props.user;
  const messageUser = props.message.user
  const color = user.username === messageUser.username ? {color: "yellow"} : null
  return(
    <div className="chatbox__messages__user-message">
      <div className="chatbox__messages__user-message--ind-message">
        <p className="name" style={color}>{messageUser.username}</p>
        <br/>
        <p className="message">{props.message.content}</p>
      </div>
    </div>
  );
}

export default Message
