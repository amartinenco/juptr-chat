import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const conversationButtonsStyles = makeStyles((theme: Theme) =>
createStyles({
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '22%',
    left: '35%'
  },
}),
);
export default conversationButtonsStyles;