import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const chatMessageStyles = makeStyles((theme: Theme) =>
createStyles({
  messageArea: {
    display: 'flex',
    width: '100%',
    overflowY: 'auto'
  },
  message: {
    border: "0.5px solid black",
    borderRadius: "10px",
    margin: "5px",
    padding: "10px",
    display: "inline-block",
    minWidth: "100px",
    maxWidth: "250px",

    "&.fromOther $fromOther": {
      backgroundColor: '#c77708'
    },
  },
  // fromOther: {
  //   color: '#4CAF50'
  // },
  right: {
    justifyContent: 'flex-end !important',
  },
  left: {
    justifyContent: 'flex-start !important'
  },
  byWho: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    // display: 'inline-block',
    textOverflow: 'ellipsis',
    // width: '100px'
    // display: 'block',    
    // paddingTop: '6px',
    // fontSize: '13px',
    // color: '#666', 
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
    // width: '50px'
    // overflow: 'hidden',
    // whiteSpace: 'nowrap',
    // textOverflow: 'ellipsis',
    // inlineSize: '150px' 
  }
}),
);
export default chatMessageStyles;