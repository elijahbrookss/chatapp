import React from 'react';

class ContextMenu extends React.Component {
  componentDidMount(){
    this.props.positionContextMenu();
  }

  message = this.props.messageClicked

  handleMessage = (e) => {
    const element = e.target;
    switch(element.className) {
      case "delete":
        this.props.deleteMessage(this.message);
        break;
      case "edit":
        this.props.switchFormMode(true);
        break;
      case "react":
        console.log("React to")
        break;
      default:
        return null;
    }
  }

  render(){
    return(
      <div id="contextMenu" className="context-menu" onClick={this.handleMessage}>
        <ul>
          <li><div className="delete">Delete Message</div></li>
          <li><div className="edit">Edit Message</div></li>
          <li><div className="react">Add Reaction</div></li>
        </ul>
      </div>
    );
  }
}

export default ContextMenu
