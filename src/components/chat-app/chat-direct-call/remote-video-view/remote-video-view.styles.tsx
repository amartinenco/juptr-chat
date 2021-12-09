import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const remoteVideoViewStyles = makeStyles((theme: Theme) =>
createStyles({
  remoteVideoContainer: {
  },
  videoElement: {
    width: '100%',
    height: '90vh'
  }
}),
);
export default remoteVideoViewStyles;