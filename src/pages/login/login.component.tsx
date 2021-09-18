import React, { Fragment } from 'react';

import { Grid, CssBaseline } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import loginStyles from './login.styles';
import SignIn from '../../components/sign-in/sign-in.component';
import { useLocation  } from 'react-router-dom';

const Login: React.FC = (props) => {

  const classes = loginStyles();
	const location = useLocation();  
	
  return (
    <Grid container component="main" className={classes.root}>
			<CssBaseline />
			{
				location.pathname === '/' ? 
					<Fragment>
					<Grid item xs={false} sm={4} md={6} className={classes.image} />
					<Grid item xs={12} sm={8} md={6} className={classes.loginSection } component={Paper} elevation={6} square>
						<SignIn />
					</Grid> 
					</Fragment>
				: 
				<Fragment>
					<Grid item xs={12} sm={12} md={12} className={classes.loginSection } component={Paper} elevation={6} square>
						<SignIn />
					</Grid> 
				</Fragment>
			}
    </Grid>
  );
}

export default Login;