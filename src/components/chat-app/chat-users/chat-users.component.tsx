import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import ChatUserItem from './chat-user-item/chat-user-item.component';
import ChatUserList from './chat-user-list/chat-user-list.component';

const ChatUsers: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const activeUsers = useSelector((state: RootState) => state.chat.activeUsers);
  const busyUsers = useSelector((state: RootState) => state.chat.busyUsers);
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
      <ChatUserItem displayName={user?.displayName} fullName={user?.fullName} key={'currentUser'} self={true} busy={true} />
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
      {
      user ? 
        <ChatUserList user={user} filteredUsers={filteredUsers} activeUsers={activeUsers} busyUsers={busyUsers}/> //availableUsers={availableUsers}/>
        : "You must be logged in"
      }
    </React.Fragment>
  );
}

export default ChatUsers;