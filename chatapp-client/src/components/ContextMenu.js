import React from 'react';

class ContextMenu extends React.Component {
  componentDidMount(){
    this.props.positionContextMenu();
  }


  handleMessage = (e) => {
    const element = e.target;
    const contextInfo = this.props.contextInfo;
    let method;
    switch(element.getAttribute("name")) {
      case "delete":
        method = contextInfo ? contextInfo.method : this.props.deleteSelection
        method(this.props.selected);
        break;
      case "leave":
        method = contextInfo.method;
        method(this.props.selected);
        break;
      case "edit":
        method = this.props.switchFormMode
        method(true);
        break;
      case "react":
        method = contextInfo.reactMethod;
        method(this.props.selected);
        break;
      default:
        return null;
    }
  }

  reactionSelection = (e) => {
    const element = e.target;
    const contextInfo = this.props.contextInfo;
    contextInfo.reactMethod(this.props.selected, element.textContent);
  }



  render(){
    const contextInfo = this.props.contextInfo;
    const permissionLevel = contextInfo.permissionLevel;
    let contextMenu;

    switch(this.props.mode){
      case "channel":
        if (permissionLevel === "restricted"){
          contextMenu = <div className="context-menu active" id="contextMenu" onClick={this.handleMessage} >
            <div name="react" className="react">
              <button onClick={this.reactionSelection} name="love" className="emoji">💖</button>
              <button onClick={this.reactionSelection} name="like" className="emoji">👍</button>
              <button onClick={this.reactionSelection} name="laugh" className="emoji">😂</button>
              <button onClick={this.reactionSelection} name="cry" className="emoji">😥</button>
            </div>

          </div>
        }else {
          contextMenu = <div className="context-menu active" id="contextMenu" onClick={this.handleMessage} >
            <div name="edit" className="item edit"><i   name="edit" className="fa fa-clone"></i> Edit</div>
            <div name="delete" className="item delete"><i  name="delete" className="fa fa-trash-o "></i> Delete</div>
            <hr/>
            <div name="react" className="react">
              <button onClick={this.reactionSelection} name="love" className="emoji">💖</button>
              <button onClick={this.reactionSelection} name="like" className="emoji">👍</button>
              <button onClick={this.reactionSelection} name="laugh" className="emoji">😂</button>
              <button onClick={this.reactionSelection} name="cry" className="emoji">😥</button>
            </div>
          </div>
        }

        break;
      case "profile":
        contextMenu = <div className="context-menu active" id="contextMenu" onClick={this.handleMessage} >
          <div name={contextInfo.name} className={"item " + contextInfo.name}> {contextInfo.icon} {contextInfo.text}</div>
        </div>
        break;
      default:
        return null;
    }



    return contextMenu
  }
}

export default ContextMenu
