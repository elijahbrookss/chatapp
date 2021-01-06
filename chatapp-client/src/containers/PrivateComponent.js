import React, { Component } from 'react';
import ChannelAdapters from '../adapters/ChannelAdapters';

import {
  Route,
Redirect
} from 'react-router-dom'

function PrivateComponent({component: Component, ...rest}) {

  const currentUser = ChannelAdapters.isLoggedIn();
  return (
    <Route
      {...rest}

      render={
        props =>
        currentUser ?
          <Component {...props} />
          :
          <Redirect to = "/login" />
      }
      />
  );
}

export default PrivateComponent;
