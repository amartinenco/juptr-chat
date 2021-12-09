import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const localVideoViewStyles = makeStyles((theme: Theme) =>
createStyles({
  localVideoContainer: {
    backgroundColor: 'black',
    width: '200px',
    height: '150px',
    borderRadius: '5px',
    position: 'absolute',
    top: '10%',
    right: '10%',
  },
  videoElement: {
    width: '100%',
    height: '100%'
  }
}),
);
export default localVideoViewStyles;