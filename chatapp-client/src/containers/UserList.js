import React from 'react';
import UserCard from '../components/User';

const UserList = (props) =>{
  const users = [
    {username: "elijahcbrooks"},
    {username: "davidmolina"},
    {username: "somerandomguy"}
  ]
  
  return(
    <div className='chatbox__user-list'>
      <h1>User list</h1>
      {users.map(user=> <UserCard user={user} /> )}
    </div>
  );
}

export default UserList
