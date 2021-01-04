import React, { Component } from 'react';
import '../component-stylesheets/LandingPage.css'
// import { Button } from 'semantic-ui-react'

export default class LandingPage extends Component{



  render(){
    return(
      <div class="bgimg w3-display-container w3-animate-opacity w3-text-white">
        <div class="w3-display-topleft w3-padding-large w3-xlarge">
          Login/Signup {/* Button, on click route to /login */}
        </div>
        <div class="w3-display-middle mid-section">
          <h1 class="w3-jumbo w3-animate-top">Blabber</h1>
          <hr class="w3-border-grey" style={{margin: "auto", width: "40%"}}/>
          <p class="w3-large w3-center">Chat made easy</p>
        </div>
    </div>

    );
  }
}
