import React from 'react';
import { Button, Grid, InputAdornment, TextField, Link, Box, CssBaseline } from '@material-ui/core';
import { AccountCircle, LockRounded } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import { ReactComponent as JuptrLogo } from './assets/logo.svg';
import JupiterImg from './assets/jupiter.jpg';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: `url(${JupiterImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'whitesmoke',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    margin: theme.spacing(1),
    maxHeight: 250
  },
  loginSection: {
    backgroundColor: 'whitesmoke'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  }
}));

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} className={classes.loginSection } component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <JuptrLogo className={classes.logo} />
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{ 
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
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default App;
