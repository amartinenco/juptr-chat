import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { maxHeight } from "@material-ui/system";

const remoteVideoViewStyles = makeStyles((theme: Theme) =>
createStyles({
  remoteVideoContainer: {
    // width: '100%',
    // height: '100%'

  },
  videoElement: {
    // width: '100%',
    // height: '90vh'
    // objectFit: 'none'
    width: '100%',
    height: '90vh'
    // height: 'auto'
  }
}),
);
export default remoteVideoViewStyles;