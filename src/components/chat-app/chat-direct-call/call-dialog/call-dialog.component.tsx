import React from 'react';

import callDialogStyles, { CallDialogToolTip } from './call-dialog.styles';
import Modal from '@material-ui/core/Modal';
import CallEndIcon from '@material-ui/icons/CallEnd';
import CallIcon from '@material-ui/icons/Call';
import { green } from '@material-ui/core/colors';
import Button from "@material-ui/core/Button";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { hangUpTheCall, pickUpTheCall } from '../../../../utils/webSocketConnection/webSocketConnection.service';
const sfx = require('../../../../assets/sounds/ringtone_minimal.ogg');

interface Props {
  name: string
}

const CallDialog: React.FC<Props> = (props) => {
  
  const callDialog = useSelector((state: RootState) => state.call.showCallDialog);
  const user = useSelector((state: RootState) => state.user.user);

  const name = props.name;

  const classes = callDialogStyles();

  const handleAnswer = () => {
    if (user) {
      pickUpTheCall(user, name);
    }
  }

  const handleHangup = () => {
    if (user) {
      hangUpTheCall(user, name);
    }
  }

  const callingTo = (
    <div className={classes.paper}>
      <audio src={sfx.default} autoPlay loop />  
      <CallDialogToolTip title={name}>
        <h2 style={{ paddingBottom: 25 }} id="call-dialog-title" className={classes.dialogText}>Calling: {name}</h2>
      </CallDialogToolTip>
      <p id="call-dialog-description" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Button variant="contained" 
        startIcon={<CallEndIcon color="secondary"  style={{ fontSize: 50 }}/>}
        onClick={handleHangup}
        >
        Hang Up
      </Button>
      </p>
    </div>
  );

  const callingFrom = (
    <div className={classes.paper}>
    <h2 style={{ paddingBottom: 25 }} id="call-dialog-title" className={classes.dialogText}>Call from: {name}</h2>
    <p id="call-dialog-description" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
    <audio src={sfx.default} autoPlay loop />  
    <Button 
      variant="contained" 
      startIcon={<CallIcon style={{ color: green[500], fontSize: 50 }}/>}
      onClick={handleAnswer}
      >
      Answer
    </Button>
    <Button 
      variant="contained" 
      startIcon={<CallEndIcon color="secondary" 
      style={{ fontSize: 50 }}/>}
      onClick={handleHangup}
      >
      Hang Up
    </Button>
    </p>
  </div>
  );

  console.log(sfx);

  return (
    <div>
      <Modal 
        open={callDialog.show}
        aria-labelledby="call-dialog-title"
        aria-describedby="call-dialog-description"
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        {callDialog.show && callDialog.type === 'caller'? callingTo : callingFrom}
      </Modal>
    </div>
  );
}

export default CallDialog;