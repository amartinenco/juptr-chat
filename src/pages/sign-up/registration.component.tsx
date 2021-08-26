import React from 'react';
import signUpStyles from './registration.styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import SignUp from '../../components/sign-up/sign-up.component';

const Registration: React.FC = () => {
    const classes = signUpStyles();
    return (    
        <Grid container component="main">
            <CssBaseline />
            <Grid md={12} xs={12} sm={12} className={classes.root} item component={Paper} elevation={6} square>
                <SignUp />
            </Grid>
        </Grid>
    );
}

export default Registration;