import { makeStyles } from '@material-ui/core/styles';

const signUpStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'whitesmoke',
        height: '100vh'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
    },
    logo: {
        margin: theme.spacing(1),
        minHeight: 50,
        maxHeight: 100
    },
    form: {
        maxWidth: 500,
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 1),
    }
}));

export default signUpStyles;