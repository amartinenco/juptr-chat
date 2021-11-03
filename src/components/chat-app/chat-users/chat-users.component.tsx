import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import ILoggedIn from '../../../types/logged-in.interface';
import chatUsersStyles from './chat-users.styles';

interface Props {
  user?: ILoggedIn | null | undefined;
}

const ChatUsers: React.FC<Props> = ({ user } : Props) => {
  const classes = chatUsersStyles();
  return (
    <React.Fragment>
      {/* <List> */}
      <ListItem button key={user?.displayName}>
        <ListItemIcon>
        <Avatar alt={user?.displayName} src="#" />
        </ListItemIcon>
        <ListItemText primary={ "(" + user?.displayName + ")" + user?.fullName }></ListItemText>
      </ListItem>
      {/* </List> */}
      <Divider />
      <Grid item xs={12} style={{padding: '10px'}}>
        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
      </Grid>
      <Divider />
      <List>
        <ListItem button key="RemySharp">
            <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            </ListItemIcon>
            <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
            <ListItemText secondary="online" ></ListItemText>
        </ListItem>
        <ListItem button key="Alice">
            <ListItemIcon>
                <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
            </ListItemIcon>
            <ListItemText primary="Alice">Alice</ListItemText>
        </ListItem>
        <ListItem button key="CindyBaker">
          <ListItemIcon>
              <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
          </ListItemIcon>
          <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
        </ListItem>
      </List>
    </React.Fragment>
  );
}

export default ChatUsers;