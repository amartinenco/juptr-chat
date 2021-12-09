import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const conversationButtonStyles = makeStyles((theme: Theme) =>
createStyles({
  button: {
    width: '50px',
    height: '50px',
  }
}),
);
export default conversationButtonStyles;