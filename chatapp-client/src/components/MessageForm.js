import React from 'react';

class MessageForm extends React.Component {
  state= {
    value: "",
    editStarted: false
  }

  onChange = (e) => {
    this.setState({value: e.target.value})
  }

  componentDidUpdate(){
    if(this.state.value !== this.props.messageClicked.content){
      if(this.props.editMode && !this.state.editStarted){
        this.setState({
          value: this.props.messageClicked.content,
          editStarted: true
        })
      }
    }
  }

  formSubmit = (e) => {
    this.props.formSubmit(e, this.state.value);
    this.setState({
      value: "",
      editStarted: false
    })
  }

  render() {
    return(
      <form className="input-form" onSubmit={this.formSubmit} >
        <input onChange={this.onChange} value={this.state.value} type="text" placeholder="Enter your message"/>
      </form>
    );
  }
}

export default MessageForm
