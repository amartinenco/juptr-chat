import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { maxWidth } from "@material-ui/system";

const chatDirectCallStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    height: '100%',
    position: 'relative'
  },
  talking: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: 'black',
  },
  pending: {
    backgroundColor: '#ffffff',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2342a5f5' fill-opacity='0.58'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    height: '90vh'
  },
}),
);
export default chatDirectCallStyles;