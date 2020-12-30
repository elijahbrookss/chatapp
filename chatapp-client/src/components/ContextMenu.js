import React from 'react';

class ContextMenu extends React.Component {
  componentDidMount(){
    this.props.positionContextMenu();
  }

  message = this.props.messageClicked

  handleMessage = (e) => {
    const element = e.target;
    switch(element.getAttribute("name")) {
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
      <div className="context-menu active" id="contextMenu" onClick={this.handleMessage} >
        <div name="edit" className="item edit"><i   name="edit" className="fa fa-clone"></i> Edit</div>
        <div name="delete" className="item delete"><i  name="delete" className="fa fa-trash-o "></i> Delete</div>
        <hr/>
        <div name="react" className="item react"><i name="react" className="fa fa-refresh "></i> React</div>
      </div>


    );
  }
}

export default ContextMenu
