import React, { Component } from 'react';
import '../component-stylesheets/User.css';
import ChannelIcon  from '../components/ChannelIcon';
import ChannelAdapters from '../adapters/ChannelAdapters';
import ContextMenu from '../components/ContextMenu';
import {
  Redirect
} from 'react-router-dom'

export default class LandingPage extends Component{

  state = {
    currentUser: null,
    channelRoute: null,
    displayContextMenu: false,
    channelEvent: {},
    selectedChannel: {}
  }

  componentDidMount(){
    ChannelAdapters.fetchUser()
    .then(response => response.json())
    .then(currentUser => {
      this.setState({currentUser})
    })
    document.onclick = this.hideContextMenu;
  }

  newChannel = () => {
    ChannelAdapters.newChannel()
    .then(response => response.json())
    .then(channelRoute => this.setState({channelRoute}))
  }

  routeToChannel = channel => {
    this.setState({channelRoute: channel})
  }

  changeDisplayContextMenu = (e, selectedChannel) => {
    const contextMenu = document.querySelector("#contextMenu");
    e.preventDefault();
    this.setState({channelEvent: e, selectedChannel});
    if(contextMenu){
      this.positionContextMenu(e);
    }else{
      this.displayContextMenu();
    }
  }

  displayContextMenu = () => {
    this.setState({displayContextMenu: true});
  }

  hideContextMenu = () => {
    this.setState({displayContextMenu: false});
  }

  deleteChannel = (channel) => {
    ChannelAdapters.deleteChannel(channel)
  }

  leaveChannel = (channel) => {
    const currentUser = this.state.currentUser;
    ChannelAdapters.leaveChannel(channel, currentUser)
  }

  positionContextMenu = (channelEvent = this.state.channelEvent) => {
    const contextMenu = document.querySelector("#contextMenu");
    contextMenu.style.display = "block";
    contextMenu.style.left = channelEvent.clientX + "px";
    contextMenu.style.top = channelEvent.clientY + "px";
  }


  render(){
    const currentUser = this.state.currentUser;
    const selectedChannel = this.state.selectedChannel;
    const displayContextMenu = this.state.displayContextMenu;
    let contextInfo = {
      text: "Delete",
      icon: <i  name="delete" className="fa fa-trash-o "></i>,
      name: "delete",
      method: this.deleteChannel
    }
    if (selectedChannel.channel_owner) {
      contextInfo = selectedChannel.channel_owner.id === currentUser.id ?
       contextInfo
       :
       {
         text: "Leave",
         icon: <i name="leave" className="fas fa-sign-out-alt"></i>,
         name: "leave",
         method: this.leaveChannel
       }
    }
    return(
      <>
      <div className="w3-main w3-content w3-padding" style={{maxWidth: "1200px",marginTop: "100px" }}>
        {this.state.channelRoute ? <Redirect push to={"/channels/"+this.state.channelRoute.id} /> : null }
        <button onClick={this.newChannel} className="new-channel"> <i className="fa fa-plus" aria-hidden="true"></i> New Channel </button>
        <div className="w3-row-padding w3-padding-16 w3-center channel-holder">
            <h1> Channels </h1>
            {
              currentUser ?
              currentUser.channels.map(channel => {
                return <ChannelIcon
                  key={channel.id}
                  channel={channel}
                  routeToChannel={this.routeToChannel}
                  changeDisplayContextMenu={this.changeDisplayContextMenu}

                 />
              })
              :
              null
            }
        </div>

        <div className="w3-row-padding w3-padding-16 w3-center channel-holder">
            <h1> Owned Channels </h1>
            {
              currentUser ?
              currentUser.owned_channels.map(channel => {
                return <ChannelIcon
                  key={channel.id}
                  channel={channel}
                  routeToChannel={this.routeToChannel}
                  changeDisplayContextMenu={this.changeDisplayContextMenu}

                />
              })
              :
              null
            }
        </div>
      </div>

      {displayContextMenu ? <ContextMenu
          mode="profile"
          selected={this.state.selectedChannel}
          deleteSelection={this.deleteChannel}
          positionContextMenu={this.positionContextMenu}
          contextInfo={contextInfo}
        /> : null}
      </>
    );
  }
}
