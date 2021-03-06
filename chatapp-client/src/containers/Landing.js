import React, { Component } from 'react';
import '../component-stylesheets/LandingPage.css'
// import { Button } from 'semantic-ui-react'

export default class LandingPage extends Component{

  render(){
    return(
      <div class="bg w3-display-container w3-animate-opacity w3-text-white">
        <div class="w3-display-middle mid-section">
          <h1 class="w3-jumbo w3-animate-top">Blabber</h1>
          <hr class="w3-border-grey" style={{margin: "auto", width: "40%"}}/>
          <p class="w3-large w3-center">
            <div class="loader">
              <div class="duo duo1">
                <div class="dot dot-a"></div>
                <div class="dot dot-b"></div>
              </div>
              <div class="duo duo2">
                <div class="dot dot-a"></div>
                <div class="dot dot-b"></div>
              </div>
            </div>
          </p>
        </div>
    </div>

    );
  }
}
