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

  login = (e, username, password) => {
    e.preventDefault();
    fetch(`http://localhost:3001/login`, {
      method: "POST",
      headers: { "Content-Type":"application/json"},
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
    .then( res => res.json() )
    .then( data => {
      localStorage.setItem('auth_key', data['jwt'])
    })
  }

  signUp = (e, firstName, lastName, username, email, password) => {
    e.preventDefault()
    fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({
        user: {
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: email,
          password: password
        }
      })
    })
    .then( res => res.json() )
    .then( data => localStorage.setItem('auth_key', data['jwt']))
  }

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
          {loginState ? <Login login={this.login} /> : <Signup signUp={this.signUp}/>}
          <div></div>
          <Button className="button" onClick={this.triggerChange}>{buttonText}</Button>
        </div>
      </div>
    );
  }


}
