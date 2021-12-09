import { ListItem, ListItemIcon, Avatar, ListItemText, Button } from '@material-ui/core';
import React from 'react';
import { callAttempt } from '../../../../utils/webSocketConnection/webSocketConnection.service';
import { OnlineBadge, BusyBadge } from './chat-user-item.styles';

interface Props {
  displayName: string | undefined;
  fullName?: string | undefined;
  from?: string | undefined;
  self: boolean;
  busy: boolean;
}

const ChatUserItem: React.FC<Props> = ({ displayName, fullName, from, self, busy } : Props) => {

  const callSomeone = (event: React.MouseEvent<HTMLElement>) => {
  if (displayName && from) {
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

          {!self ?
             busy ?
            <BusyBadge
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
            >
              <Avatar alt={displayName} src="#" />
            </BusyBadge>
            :
            <OnlineBadge
              overlap="circular"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot"
              >
              <Avatar alt={displayName} src="#" />
            </OnlineBadge> 
            :
            <Avatar alt={displayName} src="#" />
          }

        </ListItemIcon>
        <ListItemText primary={ displayName }></ListItemText> 

        { !self && !busy ? 
          <Button variant="contained" 
          onClick={callSomeone}
          >
          Call
          </Button> : null
        }
      </ListItem>
    </div>
  </React.Fragment>
  );
}

export default ChatUserItem;