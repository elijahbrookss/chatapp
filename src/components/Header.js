import {Form} from 'semantic-ui-react'
import React from 'react'
import ChannelAdapters from '../adapters/ChannelAdapters';

const cable = ActionCable.createConsumer('wss://blabber-chatapp.herokuapp.com/cable');

class Header extends React.Component {

  state = {
    formState: false,
    chatName: "",
  }

  componentDidUpdate(){
    if(this.state.chatName === "" && this.props.channel.name){
      this.setState({chatName: this.props.channel.name})
    }
  }

  componentDidMount(){
      cable.subscriptions.create(
        { channel: 'ChannelsChannel',
          channel_id: this.channelId
       },
       {received: channel => this.renderChangesToChannel(channel)}
      )
  }

  renderChangesToChannel = (channel) => {
    this.setState({chatName: channel.name})
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
    const channel = this.props.channel;
    channel.name = chatName;

    this.setState({chatName});
    this.changeHeaderState();
    ChannelAdapters.updateChannel(channel)
  }

  render () {
    return(
      <>
      <ac
        channel={{
          channel: 'ChannelsChannel',
          channel_id: this.channelId,
       }}
      />

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
      </>
    )
  }
  }

export default Header;
