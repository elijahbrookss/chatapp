import React from 'react';

const MessageForm = (props) =>{

  return(
    <form className="input-form" onSubmit={props.newMessage} >
      <input type="text" placeholder="Enter your message"/>
    </form>
  );
}

export default MessageForm
