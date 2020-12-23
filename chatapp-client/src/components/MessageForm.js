import React from 'react';

const MessageForm = (props) =>{

  return(
    <form onSubmit={props.newMessage} >
      <input type="text" placeholder="Enter your message"/>
    </form>
  );
}

export default MessageForm
