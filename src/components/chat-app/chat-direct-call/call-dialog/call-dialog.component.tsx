import React from 'react';
import callDialogStyles, { CallDialogToolTip } from './call-dialog.styles';
import Modal from '@material-ui/core/Modal';
import CallEndIcon from '@material-ui/icons/CallEnd';
import CallIcon from '@material-ui/icons/Call';
import { green } from '@material-ui/core/colors';
import Button from "@material-ui/core/Button";
import { useSelector } from 'react-redux';
import store, { RootState } from '../../../../redux/store';
import { callAttemptResponse, hangUpTheCall, pickUpTheCall } from '../../../../utils/webSocketConnection/webSocketConnection.service';
import { CallAttemptResponse } from '../../../../utils/webSocketConnection/webSocket.types';
import { setCallState, showCallDialog } from '../../../../redux/call/call.actions';
import { call } from '../../../../utils/webRTC/webRTC.service';
import { CallStates } from '../../../../redux/call/call.types';

interface Props {
  name: string
}

const CallDialog: React.FC<Props> = (props) => {
  
  const callDialog = useSelector((state: RootState) => state.call.showCallDialog);
  const user = useSelector((state: RootState) => state.user.user);


  // const isCalling = props.isCalling;
  const name = props.name;

  // const callState = useSelector((state: RootState) => state.call.showCallDialog);

  const classes = callDialogStyles();

  const [open, setOpen] = React.useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  /*
  export interface ICallAttemptResponse {
  name: string,
  target: string,
  response: CallAttemptResponse
}

export enum CallAttemptResponse {
  CALL_ACCEPTED = 'CALL_ACCEPTED',
  CALL_REJECTED = 'CALL_REJECTED',
  CALL_UNAVAILABLE = 'CALL_UNAVAILABLE',
  */

  const handleAnswer = () => {
    if (user) {
      pickUpTheCall(user, name);
    }
    // if (user && user.displayName && name) {
    //   store.dispatch(showCallDialog({
    //     show: false
    //   }));
    //   callAttemptResponse({
    //     name: user.displayName,
    //     target: name,
    //     response: CallAttemptResponse.CALL_ACCEPTED
    //   });
    //   store.dispatch(setCallState(CallStates.CALL_IN_PROGRESS));
    // }
  }

  const handleHangup = () => {
    if (user) {
      hangUpTheCall(user, name);
    }
    // if (user && user.displayName && name) {
    //   callAttemptResponse({  
    //     name: user.displayName,
    //     target: name,
    //     response: CallAttemptResponse.CALL_REJECTED
    //   });
    // }
  }

  const callingTo = (
    <div className={classes.paper}>
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

  return (
    <div>
       {/* <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
      <Modal 
        open={callDialog.show}
        // onClose={handleClose}
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