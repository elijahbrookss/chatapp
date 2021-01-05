import React from 'react';

class ContextMenu extends React.Component {
  componentDidMount(){
    this.props.positionContextMenu();
  }

  selected = this.props.selected

  handleMessage = (e) => {
    const element = e.target;
    switch(element.getAttribute("name")) {
      case "delete":
        this.props.deleteSelection(this.selected);
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
    let contextMenu;
    switch(this.props.mode){
      case "channel":
        contextMenu = <div className="context-menu active" id="contextMenu" onClick={this.handleMessage} >
          <div name="edit" className="item edit"><i   name="edit" className="fa fa-clone"></i> Edit</div>
          <div name="delete" className="item delete"><i  name="delete" className="fa fa-trash-o "></i> Delete</div>
          <hr/>
          <div name="react" className="item react"><i name="react" className="fa fa-refresh "></i> React</div>
        </div>
        break;
      case "profile":
        contextMenu = <div className="context-menu active" id="contextMenu" onClick={this.handleMessage} >
          <div name="delete" className="item delete"><i  name="delete" className="fa fa-trash-o "></i> Delete</div>
        </div>
        break;
      default:
        return null;
    }
    return contextMenu
  }
}

export default ContextMenu
