import React from 'react';

const Message = (props) =>{
  return(
    <div className="chatbox__messages__user-message">
      <div className="chatbox__messages__user-message--ind-message">
        <p className="name">{props.message.user.username}</p>
        <br/>
        <p className="message">{props.message.content}</p>
      </div>
    </div>
  );
}

export default Message
