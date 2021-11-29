import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const chatMessageStyles = makeStyles((theme: Theme) =>
createStyles({
  messageArea: {
    display: 'flex',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  message: {
    borderRadius: "10px",
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.3)',
    margin: "5px",
    padding: "10px",
    display: "inline-block",
    minWidth: "100px",
    maxWidth: "250px",
    color: 'whitesmoke',
    wordWrap: 'break-word'
        // "&.fromOther $fromOther": {
    //   backgroundColor: '#c77708',
    // },
  },
  right: {
    justifyContent: 'flex-end !important',
  },
  left: {
    justifyContent: 'flex-start !important'
  },
  byWho: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }
}),
);
export default chatMessageStyles;