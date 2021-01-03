import {Form} from 'semantic-ui-react'
import React from 'react'
import ChannelAdapters from '../adapters/ChannelAdapters';

class Header extends React.Component {

  state = {
    formState: false,
    chatName: "",
  }

  componentDidUpdate(){
    if(this.state.chatName === ""){
      this.setState({chatName: this.props.channel.name})
    }
  }

  changeFormState = (e) => {
    if(this.props.isOwner()){
      this.setState({formState: true})
    }
  }

  changeHeaderState = (e) => {
    this.setState({formState: false});
  }

  updateChatName = (e) => {
    const chatName = e.target.firstChild.firstChild.value
    this.setState({chatName});
    this.changeHeaderState();
    const channel = this.props.channel;
    channel.name = chatName;
    ChannelAdapters.updateChannel(channel)
    .then(resp => resp.json())
    .then(console.log)
  }

  render () {
    return(
      <div onClick={this.changeFormState} className = "chatText">
          { this.state.formState ?
              <Form onSubmit={this.updateChatName}>
                <Form.Field>
                  <input />
                </Form.Field>
              </Form>
              :
              <h1>{this.state.chatName}</h1>
          }
      </div>
    )
  }
  }

export default Header;
