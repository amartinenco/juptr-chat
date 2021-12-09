import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import ILoggedIn from '../../../../types/logged-in.interface';
import ChatUserItem from '../chat-user-item/chat-user-item.component';
import chatUsersList from './chat-user-list.styles';

interface Props {
  filteredUsers: string[],
  activeUsers: string[],
  user: ILoggedIn,
  busyUsers: string[],
}

const ChatUserList: React.FC<Props> = (props) => {
  const classes = chatUsersList();

  const filteredUsers = props.filteredUsers;
  const activeUsers = props.activeUsers;
  const user = props.user;
  const busyUsers = props.busyUsers;

  return (
  <div className={classes.usersList}>
     <List>
        {
          (activeUsers.length <= 1)?
          <ListItem button key={'no_users'}>
            <ListItemText>
              No users online
            </ListItemText> 
          </ListItem>
          :
          filteredUsers.filter((activeUser) => activeUser !== user?.displayName).map((activeUser, index) => 
            <ChatUserItem displayName={activeUser} key={index} from={user?.displayName} self={false} 
              busy={
                busyUsers.includes(activeUser)
              } />
          )
        }
      </List>
  </div>
  );
}

export default ChatUserList;