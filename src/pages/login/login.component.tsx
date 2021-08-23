import React from 'react';

import { Button, Grid, InputAdornment, TextField, Link, CssBaseline } from '@material-ui/core';
import { AccountCircle, LockRounded } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as JuptrLogo } from '../../assets/logo.svg';
import loginStyles from './login.styles';

const Login: React.FC = () => {
    const classes = loginStyles();

    return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} className={classes.loginSection } component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <JuptrLogo className={classes.logo} />
          <Typography component="h1" variant="h5" className={classes.signIn}>
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Button 
              fullWidth 
              variant="outlined" 
              color="primary" 
              className={classes.register}>
                Register
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {"Forgot password?"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;