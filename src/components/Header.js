import {Form} from 'semantic-ui-react'
import React from 'react'
import ChannelAdapters from '../adapters/ChannelAdapters';

class Header extends React.Component {

  state = {
    formState: false,
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
              <h1>{this.props.channel.name}</h1>
          }
      </div>
      </>
    )
  }
  }

export default Header;
