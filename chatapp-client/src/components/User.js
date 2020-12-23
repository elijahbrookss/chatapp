import React from 'react';

const UserCard = (props) =>{

  return(
      <div className='chatbox__user--active'>
        <p>{props.user.username}</p>
      </div>
  );
}

export default UserCard
