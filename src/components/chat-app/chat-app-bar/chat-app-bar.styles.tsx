import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const chatAppBarStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxHeight: 52,
    maxWidth: 52
  },
}),
);
export default chatAppBarStyles;