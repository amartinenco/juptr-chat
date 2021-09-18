import React from 'react';

import { Button, Grid, InputAdornment, TextField, Link } from '@material-ui/core';
import { Link as RouterLink, RouteComponentProps, withRouter } from 'react-router-dom';
import { AccountCircle, LockRounded } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';

import { ReactComponent as JuptrLogo } from '../../assets/logo.svg';
import signInStyles from './sign-in.styles';

import useRequest from '../../hooks/use-request.hook';
import LoggedIn from '../../types/logged-in.interface';
import { useAuthDispatch, useAuthState } from '../../contexts/auth.context';
import { loginUser } from '../../contexts/auth.actions';

// interface ChildComponentProps extends RouteComponentProps<any> {
//     /* other props for ChildComponent */
// }

const SignIn: React.FC<RouteComponentProps<any>> = ({ history }) => {
    const [errors, setErrors] = React.useState<{ email: string, password: string }>({ email: '', password: '' });
    const [userCredentials, setCredentials] = React.useState<{ email: string, password: string }>({ email: '', password: '' });
    const { email, password } = userCredentials;

	const dispatch = useAuthDispatch();
	const { loading, errorMessage } = useAuthState();

    // const { doRequest } = useRequest({
    //     url: 'http://localhost:5000/v1/auth/signin',
    //     method: 'post',
    //     body: {
    //       email,
    //       password
    //     },
    //     onSuccess: (data: LoggedIn) => console.log('success', data)
    // });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value });

        if (name === 'email') {
            if (value.length > 0 && !validator.isEmail(value)) {
                setErrors({ ...errors, email: 'Invalid email' });
            } else {
                setErrors({ ...errors, email: '' });
            }
        }

        if (name === 'password') {
            if (value.length > 0 && value.length < 8) {
                setErrors({ ...errors, password: 'Passwords must be at least 8 characters long' });
            } else {
                setErrors({ ...errors, password: '' });
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
		try {
		    let response = await loginUser(dispatch, { email, password });
			if (!response?.data.displayName) return;
            history.push('/chat-app');
		} catch (error: any) {
			console.log(error);
		}
    }

    const classes = signInStyles();

    return (
        <div className={classes.paper}>
            <JuptrLogo className={classes.logo} />
            <Typography component="h1" variant="h5" className={classes.signIn}>
                Sign in
            </Typography>
          
            {JSON.stringify(errorMessage)}
            

            <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    InputProps={{
                        spellCheck: 'false',
                        startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>)
                    }}
                    onChange={handleChange}
                    error={Boolean(errors?.email)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    InputProps={{
                        startAdornment: (<InputAdornment position="start"><LockRounded /></InputAdornment>)
                    }}
                    onChange={handleChange}
                    error={Boolean(errors?.password)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={Boolean(email?.length! === 0 || password?.length! === 0 || errors?.email || errors?.password || loading)}
                >
                    Sign In
                </Button>
                <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    className={classes.register}
                    component={RouterLink}
                    to="/signup"
                >
                    Register
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link component={RouterLink} to="/password_reset" variant="body2">
                            {"Forgot password?"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default withRouter(SignIn);