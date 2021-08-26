import { makeStyles } from '@material-ui/core/styles';

const signInStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(8, 8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    logo: {
      margin: theme.spacing(1),
      minHeight: 100,
      maxHeight: 250
    },
    signIn: {
      width: '100%', 
      maxWidth: 500,
      paddingLeft: theme.spacing(1)
    },
    form: {
      maxWidth: 500,
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(2, 0, 1),
    },
    register: {
      margin: theme.spacing(1, 0, 1),
    }
}));

export default signInStyles;