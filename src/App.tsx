import React from 'react';
import { Button, Grid, InputAdornment, TextField } from '@material-ui/core';
import { AccountCircle, LockRounded } from '@material-ui/icons';
import JuptrLogo from './assets/logo.svg';
import JupiterImg from './assets/jupiter.jpg';

import './App.css';

const App: React.FC = () => {
  return (
    <div style={{ background: 'whitesmoke', overflowY: 'hidden', overflowX: 'hidden' }}>
      <Grid container style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={6}>
          <img 
            src={JupiterImg} 
            style={{ width: '100%', height: '100%', objectFit: 'cover'}} 
            alt="brand" 
          />
        </Grid>
        <Grid 
          container 
          item xs={12} 
          sm={6} 
          alignItems="center" 
          direction="column" 
          justifyContent="space-between" 
          style={{padding: 10}}
        >
          <div />
          <div style={{ maxWidth: 400, minWidth: 300 }}>
            <Grid container justifyContent="center">
              <img src={JuptrLogo} width={200} alt="logo" />
            </Grid>
            <Grid container direction="column" >
              <TextField 
                label="Username" 
                margin="normal" 
                InputProps={{ 
                  startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>) 
                }}  
              />
              <TextField
                type="password"
                label="Password" 
                margin="normal" 
                InputProps={{ 
                  startAdornment: (<InputAdornment position="start"><LockRounded /></InputAdornment>) 
                }}  
              />
              <div style={{ height: 20 }} /> 
              <Button color="primary" variant="contained">
                Log In
              </Button>
              <div style={{ height: 20 }} />
              <Button color="primary" variant="outlined">
                Register
              </Button>
              <div style={{ height: 20 }} />
              <Button color="primary" variant="outlined">
                Register
              </Button>
            </Grid>
          </div> 
          <div />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
