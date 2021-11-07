import { ListItem, ListItemIcon, Avatar, ListItemText } from '@material-ui/core';
import React from 'react';

interface Props {
  displayName: string | undefined;
  fullName?: string | undefined;
}

const ChatUserItem: React.FC<Props> = ({ displayName, fullName } : Props) => {
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
    </ListItem>
  </React.Fragment>
  );
}

export default ChatUserItem;