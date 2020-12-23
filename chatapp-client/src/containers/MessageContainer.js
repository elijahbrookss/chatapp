import React from 'react';
import Message from '../components/Message'

const MessageContainer = (props) =>{

  return(
    <div className="chatbox__messages" ng-repeat="message in messages">
    { props.messages.map(message => <Message message={message} />) }
    </div>
  );
}

export default MessageContainer
