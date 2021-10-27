import React, { useEffect } from 'react';
import signUpStyles from './sign-up.styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link as RouterLink, RouteComponentProps, withRouter } from 'react-router-dom';
import validator from 'validator';

import { ReactComponent as JuptrLogo } from '../../assets/logo.svg';
import RegisterCredentials from '../../types/sign-up.interface';
// import { registerUser, resetErrors } from '../../contexts/auth.actions';
// import { useAuthDispatch, useAuthState } from '../../contexts/auth.context';

const resetCredentials = {
    email: '',
    displayName: '',
    fullName: '',
    password: '',
    confirmPassword: ''
}

const SignUp: React.FC<RouteComponentProps<any>> = ({ history }) => {

    const [errors, setErrors] = React.useState<RegisterCredentials>(resetCredentials);
    const [userCredentials, setCredentials] = React.useState<RegisterCredentials>(resetCredentials);
    const { email, displayName, fullName, password, confirmPassword } = userCredentials;

    // const dispatch = useAuthDispatch();
	// const { errorMessage } = useAuthState();

    // useEffect(()=>{
    //     // resetErrors(dispatch);
    // },[dispatch]);

    // useEffect(() => {
    //     if (errorMessage && errorMessage.length > 0) {
    //         let err:any = {};
    //         errorMessage.forEach((errObj:any, i:any) => {
    //             // console.log(errObj);
    //             if (errObj.param) {
    //                 err[errObj.param!] = errObj.msg!;
    //             }
    //         });
    //         setErrors(e => {
    //             return { ...e, ...err }
    //         });
    //     }
    // }, [errorMessage]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value });

        if (name === 'email') {
            if (event.target.value.length > 0) {
                if (!validator.isEmail(value)) {
                    setErrors({ ...errors, email: 'Invalid email' });
                } else {
                    setErrors({ ...errors, email: '' });
                }
            } else {
                setErrors({ ...errors, email: '' });
            }
        }

        if (name === 'displayName') {
            if (!/^[a-zA-Z._0-9]*$/g.test(value) || value.length < 6) {
                setErrors({ ...errors, displayName: 'Only letters, numbers, underscore and dots allowed. (min length 6)'});
            } else {
                setErrors({ ...errors, displayName: ''});
            }
        }

        if (name === 'fullName') {
            if (!/^[a-zA-Z\s'.,-]*$/g.test(value)) {
                setErrors({ ...errors, fullName: 'Please enter only alphabetical letters.'});
            } else {
                setErrors({ ...errors, fullName: ''});
            }
        }

        if (name === 'password') {
            if (value.length > 0 && value.length < 8) {
                setErrors({ ...errors, password: 'Passwords must be at least 8 characters long' });
            } else {
                if (value !== confirmPassword) {
                    setErrors({ ...errors, confirmPassword: "Passwords don't match", password: '' });
                } else {
                    setErrors({ ...errors, confirmPassword: '', password: '' });
                }
            }
        }

        if (name === 'confirmPassword') {
            if (value !== password) {
                setErrors({ ...errors, confirmPassword: "Passwords don't match"});
            } else {
                setErrors({ ...errors, confirmPassword: ''});
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
		// try {
		//     let response = await registerUser(dispatch, { email, displayName, fullName, password, confirmPassword });
        //     if (!response?.data.displayName) return;
        //     history.push('/signin');
		// } catch (error: any) {
		// 	// console.log(error);
		// }
    }

    const classes = signUpStyles();
    return (    
        <div className={classes.paper}>
            <JuptrLogo className={classes.logo} />   
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
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
                        spellCheck: 'false'
                    }}
                    onChange={handleChange}
                    error={Boolean(errors?.email)}
                    helperText={errors.email}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="text"
                    id="displayName"
                    label="Display Name"
                    name="displayName"
                    autoComplete="displayName"
                    InputProps={{
                        spellCheck: 'false'
                    }}
                    onChange={handleChange}
                    error={Boolean(errors?.displayName)}
                    helperText={errors.displayName}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="text"
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    autoComplete="fullName"
                    InputProps={{
                        spellCheck: 'false',
                    }}
                    inputProps={{
                        maxLength: 100
                    }}
                    onChange={handleChange}
                    error={Boolean(errors?.fullName)}
                    helperText={errors.fullName}
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
                    onChange={handleChange}
                    error={Boolean(errors?.password)}
                    helperText={errors.password}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="passwordConfirm"
                    autoComplete="new-password"
                    onChange={handleChange}
                    error={Boolean(errors?.confirmPassword)}
                    helperText={errors.confirmPassword}
                />                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={
                        Boolean(Object.keys(errors).filter((key: string) => {
                            return errors[key] !== ''    
                        }).length > 0 || !email || !displayName || !password || !confirmPassword)
                    }
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2" component={RouterLink} to="/signin">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default withRouter(SignUp);