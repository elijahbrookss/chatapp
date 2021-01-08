import React from 'react';
import ChannelAdapters from '../adapters/ChannelAdapters';

class NavBar extends React.Component {

  state = {
    currentUser: {},
    currentPage: ""
  }

  grabCurrentPage() {
    const path = document.location.pathname;

    switch(path){
      case "/":
        this.setState({currentPage: "Welcome To Blabber"});
        break;
      default:
        this.setState({currentPage: "Blabber"});

    }

  }

  logout = () => {
    ChannelAdapters.logoutCurrentUser();
  }

  componentDidMount() {
    ChannelAdapters.fetchUser()
    .then(response => response.json())
    .then(currentUser => {
      this.setState({currentUser});
      this.grabCurrentPage();
    })
    this.grabCurrentPage();
  }

  render(){

    const currentUser = this.state.currentUser;

    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <p className="navbar-center navbar-brand">{this.state.currentPage}</p>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/profile"><span className="glyphicon glyphicon-user"></span> {currentUser.username ? currentUser.username : "Log In"} </a></li>
            <li><a onClick={currentUser.username ? this.logout : null} href="/login"><span className="glyphicon glyphicon-log-in"></span> {currentUser.username ? "Log Out" : "Sign Up"} </a></li>
          </ul>
          <ul className="nav navbar-nav">
            <li><a href="/" >Home</a></li>

          </ul>
        </div>

      </nav>
    );
  }
}

export default NavBar;
