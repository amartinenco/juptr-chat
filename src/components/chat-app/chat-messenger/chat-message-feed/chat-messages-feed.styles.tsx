import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const chatMessagesFeedStyles = makeStyles((theme: Theme) =>
createStyles({
  messageArea: {
    overflowY: 'scroll'
  }
}),
);
export default chatMessagesFeedStyles;