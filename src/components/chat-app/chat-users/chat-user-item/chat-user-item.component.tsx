import { ListItem, ListItemIcon, Avatar, ListItemText } from '@material-ui/core';
import React from 'react';
// import { createConnection } from '../../../../utils/webRTC/webRTC.service';

interface Props {
  displayName: string | undefined;
  fullName?: string | undefined;
}

const ChatUserItem: React.FC<Props> = ({ displayName, fullName } : Props) => {

  // const callSomeone = (event: React.MouseEvent<HTMLElement>) => {
  // if (displayName) {
  //   createConnection(displayName);
  // }
  // };

  return (
  <React.Fragment>
    <ListItem button key={displayName}>
      <ListItemIcon>
      <Avatar alt={displayName} src="#" />
      </ListItemIcon>
      { fullName ? 
        <ListItemText primary={ displayName + " (" + fullName + ")"}></ListItemText> 
        :
        <ListItemText primary={ displayName }></ListItemText> 
      }
      {/* <button onClick={callSomeone}>Call</button> */}
    </ListItem>
  </React.Fragment>
  );
}

export default ChatUserItem;