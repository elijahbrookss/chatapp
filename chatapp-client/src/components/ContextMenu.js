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
      <div className="custom-cm" id="contextMenu" onClick={this.handleMessage}>
        <div className = "custom-cm__item"> Item #1 </div>
        <div className = "custom-cm__item"> Item #1 </div>
        <div className = "custom-cm__divider"></div>
        <div className = "custom-cm__item"> Item #1 </div>
      </div>
    );
  }
}

export default ContextMenu
