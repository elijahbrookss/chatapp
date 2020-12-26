import React from 'react';

const Message = (props) =>{
  const user = props.user;
  const messageUser = props.message.user
  const color = user.username === messageUser.username ? {color: "yellow"} : null
  let date = new Date(props.message.created_at)
  date = date.getDate() === new Date().getDate() ? `Today at ${date.toLocaleTimeString()}` : date.toLocaleString();
  return(
    <div onContextMenu={e => props.changeDisplayContextMenu(e, props.message)} className="chatbox__messages__user-message" >
      <div className="chatbox__messages__user-message--ind-message">
        <p className="name" style={color}>{messageUser.username}  <span>({date})</span></p>
        <br/>
        <p className="message">{props.message.content}</p>
      </div>
    </div>
  );
}

export default Message
