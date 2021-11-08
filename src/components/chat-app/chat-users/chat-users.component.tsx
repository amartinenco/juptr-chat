import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import ILoggedIn from '../../../types/logged-in.interface';
import ChatUserItem from './chat-user-item/chat-user-item.component';
import chatUsersStyles from './chat-users.styles';

// interface Props {
//   user?: ILoggedIn | null | undefined;
// }
// const ChatUsers: React.FC<Props> = ({ user } : Props) => {
const ChatUsers: React.FC = () => {
  const classes = chatUsersStyles();
  const user = useSelector((state: RootState) => state.user.user);
  const activeUsers = useSelector((state: RootState) => state.chat.activeUsers);
  const [searchField, setSearchField] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchField(value);
  }

  const filteredUsers = activeUsers.filter(activeUser => {
    return activeUser.toLowerCase().includes(searchField.toLowerCase());
  });

  return (
    <React.Fragment>
      <ChatUserItem displayName={user?.displayName} fullName={user?.fullName} key={'currentUser'} />
      <Divider />
      <Grid item xs={12} style={{padding: '10px'}}>
        <TextField 
          id="outlined-basic-email" 
          label="Search by user id" 
          variant="outlined" 
          fullWidth 
          onChange={handleChange}
          InputProps={{
            spellCheck: 'false',
          }}
          />
      </Grid>
      <Divider />
      <List>
        {filteredUsers.filter((activeUser) => activeUser !== user?.displayName).map((activeUser, index) => 
        <ChatUserItem displayName={activeUser} key={index} />
        )}
      </List>
    </React.Fragment>
  );
}

export default ChatUsers;