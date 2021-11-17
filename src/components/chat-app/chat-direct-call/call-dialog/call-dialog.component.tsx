import React from 'react';
import callDialogStyles, { CallDialogToolTip } from './call-dialog.styles';
import Modal from '@material-ui/core/Modal';
import CallEndIcon from '@material-ui/icons/CallEnd';
import CallIcon from '@material-ui/icons/Call';
import { green } from '@material-ui/core/colors';
import Button from "@material-ui/core/Button";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

interface Props {
  name: string
}

const CallDialog: React.FC<Props> = (props) => {
  
  const callDialog = useSelector((state: RootState) => state.call.showCallDialog);

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



  const callingTo = (
    <div className={classes.paper}>
      <CallDialogToolTip title={name}>
        <h2 style={{ paddingBottom: 25 }} id="call-dialog-title" className={classes.dialogText}>Calling: {name}</h2>
      </CallDialogToolTip>
      <p id="call-dialog-description" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Button variant="contained" startIcon={<CallEndIcon color="secondary"  style={{ fontSize: 50 }}/>}>
        Hang Up
      </Button>
      </p>
    </div>
  );

  const callingFrom = (
    <div className={classes.paper}>
    <h2 style={{ paddingBottom: 25 }} id="call-dialog-title" className={classes.dialogText}>Call from: {name}</h2>
    <p id="call-dialog-description" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      
    <Button variant="contained" startIcon={<CallIcon style={{ color: green[500], fontSize: 50 }}/>}>
      Answer
    </Button>
    <Button variant="contained" startIcon={<CallEndIcon color="secondary"  style={{ fontSize: 50 }}/>}>
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