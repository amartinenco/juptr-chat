import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const chatMessengerStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  // messageArea: {
  //   display: 'flex',
  //   width: '100%',
  //   overflowY: 'auto'
  // },
  // message: {
  //   border: "0.5px solid black",
  //   borderRadius: "10px",
  //   margin: "5px",
  //   padding: "10px",
  //   display: "inline-block",
  //   maxWidth: "250px"
  // },
  // right: {
  //   justifyContent: 'flex-end !important'
  // },
  // left: {
  //   justifyContent: 'flex-start !important'
  // }
}),
);
export default chatMessengerStyles;