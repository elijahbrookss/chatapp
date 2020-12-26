import React from 'react';
import Message from '../components/Message'

const MessageContainer = (props) =>{

  return(
    <div className="chatbox__messages" ng-repeat="message in messages">
        { props.messages.map(message => <Message
            key={message.id}
            user={props.user}
            message={message}
            changeDisplayContextMenu={props.changeDisplayContextMenu}
        />) }
    </div>
  );
}

export default MessageContainer
