import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const chatMessengerStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  messageArea: {
    overflowY: 'scroll'
  }
}),
);
export default chatMessengerStyles;