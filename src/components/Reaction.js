import React from 'react';

const Message = (props) =>{
  return(
    <span onClick={() => props.deleteReaction(props.reaction)} className="reaction">{props.reaction.emoji}</span>
  );
}

export default Message
