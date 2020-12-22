import React, { Component } from 'react';
import '../component-stylesheets/Login.css'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { Button } from 'semantic-ui-react'

export default class LoginSignup extends Component {

  state = {
    login: true
  }

  triggerChange = () =>this.setState({login:!this.state.login})

  render(){
    const loginState = this.state.login;
    const buttonText = loginState ?
    "Don't have an account? No worries, we got you. Click here"
    :
    "Got an account? Click here"

    return(
      <div className = "w3-center">
        <div className="login-form">
          {loginState ? <Login /> : <Signup />}
          <Button type='submit'>Submit</Button>
          <Button className="w3-container" onClick={this.triggerChange}>{buttonText}</Button>
        </div>
      </div>
    );
  }


}
