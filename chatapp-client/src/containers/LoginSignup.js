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
      <div className="holder">
        <nav className="w3-sidebar w3-hide-medium w3-hide-small sidebar">
          <div className="bgimg"></div>
        </nav>
        <div className="main w3-main w3-padding-large">
          <header className="w3-container w3-center header">
            <h1 className="w3-jumbo"><b>Blabber</b></h1>
          </header>
        </div>
        <div className="login-form">
          {loginState ? <Login /> : <Signup />}
          <Button type='submit'>Submit</Button>
          <div></div>
          <Button className="button" onClick={this.triggerChange}>{buttonText}</Button>
        </div>
      </div>
    );
  }


}
