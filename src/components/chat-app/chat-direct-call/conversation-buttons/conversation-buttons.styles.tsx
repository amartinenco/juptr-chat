import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const conversationButtonsStyles = makeStyles((theme: Theme) =>
createStyles({
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '5%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100
  },
}),
);
export default conversationButtonsStyles;