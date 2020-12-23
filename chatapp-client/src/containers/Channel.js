import '../component-stylesheets/Channels.scss'
import React from 'react';
import UserList from './UserList';
import MessageContainer from './MessageContainer';
import MessageForm from '../components/MessageForm';

const Channel = props => {



  return(
    <div className='container' ng-cloak ng-app="chatApp">
      <h1> Idk what to put here </h1>
      <div className='chatbox' ng-controller="MessageCtrl as chatMessage">
        <UserList />
        <MessageContainer />
        <MessageForm />
      </div>
    </div>
  )
}

export default Channel;
