import { ListItem, ListItemIcon, Avatar, ListItemText } from '@material-ui/core';
import React from 'react';
import { call } from '../../../../utils/webRTC/webRTC.service';
import { callAttempt } from '../../../../utils/webSocketConnection/webSocketConnection.service';
// import { createConnection } from '../../../../utils/webRTC/webRTC.service';

interface Props {
  displayName: string | undefined;
  fullName?: string | undefined;
  from?: string | undefined;
}

const ChatUserItem: React.FC<Props> = ({ displayName, fullName, from } : Props) => {

  const callSomeone = (event: React.MouseEvent<HTMLElement>) => {
  if (displayName && from) {
    // call(displayName);
    callAttempt({
      name: from,
      target: displayName,
      type: 'caller'
    });
  }
  };

  return (
  <React.Fragment>
    <div style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
      <ListItem button key={displayName}>
        <ListItemIcon>
        <Avatar alt={displayName} src="#" />
        </ListItemIcon>
        <ListItemText primary={ displayName }></ListItemText> 
        {/* { fullName ? 
          <ListItemText primary={ displayName + " (" + fullName + ")"} 
          
          ></ListItemText> 
          :
          <ListItemText primary={ displayName }></ListItemText> 
        } */}
        <button onClick={callSomeone}>Call</button>
      </ListItem>
    </div>
  </React.Fragment>
  );
}

export default ChatUserItem;