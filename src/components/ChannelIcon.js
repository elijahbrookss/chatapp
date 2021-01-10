import React from 'react';
// TODO: Make channel-icon dynamic

export default function ChannelIcon (props) {

  const channel = props.channel;
  const users = channel.users ? channel.users : [];
  return(
    <div
    onClick={() => props.routeToChannel(channel)}
    className="w3-quarter channel-icon"
    onContextMenu ={e => props.changeDisplayContextMenu(e,channel)}

    >
      <h4><b>{props.channel.name}</b></h4>
      <p><b><i>{users.length + 1} Users </i></b></p>
    </div>
  );
}
