import React, { useEffect } from 'react';

import { Button, InputAdornment, TextField } from '@material-ui/core';
import { Link as RouterLink, RouteComponentProps, withRouter } from 'react-router-dom';
import { AccountCircle, LockRounded } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import validator from 'validator';

import { ReactComponent as JuptrLogo } from '../../assets/logo.svg';
import signInStyles from './sign-in.styles';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearAuthErrors, signInStart } from '../../redux/auth/auth.actions';

const SignIn: React.FC<RouteComponentProps<any>> = ({ history }) => {
    const [errors, setErrors] = React.useState<{ email: string, password: string }>({ email: '', password: '' });
    const [userCredentials, setCredentials] = React.useState<{ email: string, password: string }>({ email: '', password: '' });
    const { email, password } = userCredentials;

    const errorMessage = useSelector((state : RootState) => state.user.errorMessage);
    const loading = useSelector((state : RootState) => state.user.loading);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(clearAuthErrors());
    },[dispatch]);

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
        dispatch(signInStart(userCredentials));
    }

    const classes = signInStyles();

    return (
        <div className={classes.paper}>
            <JuptrLogo className={classes.logo} />
            <Typography component="h1" variant="h5" className={classes.signIn}>
                Sign in
            </Typography>         
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
            {
            (errorMessage[0] && errorMessage[0].msg)? 
                <Alert severity="error">{errorMessage[0].msg}</Alert>
                : null
            }
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
            </form>
        </div>
    );
}

export default withRouter(SignIn);