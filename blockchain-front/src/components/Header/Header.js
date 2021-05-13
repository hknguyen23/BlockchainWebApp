import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  Link
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import logo from '../../resources/images/logo192.png';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: 'white',
    padding: '10px 100px 10px 100px'
  },
  button: {
    padding: 0,
    borderRadius: '8px',
    width: '120px',
    height: '35px',
    lineHeight: 'normal',
    fontWeight: 'normal',
    textTransform: 'none',
    marginLeft: '30px',
    backgroundColor: '#cccccc'
  },
  logo: {
    margin: '10px',
    textAlign: 'center'
  },
  name: {
    margin: '10px',
    minWidth: '200px',
    fontSize: '18pt',
    fontWeight: 'bold',
    color: 'blue'
  },
  buttonText: {
    margin: '10px',
    minWidth: '100px',
    fontSize: '12pt',
    fontWeight: 'bold',
    color: '#2f85fa',
    textAlign: 'center'
  }
}));

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const classes = useStyles();
  const history = useHistory();

  const handleSignOut = () => {
    localStorage.removeItem('userID');
    setIsLoggedIn(false);
    history.push('/');
  }

  const handleProfile = () => {
    history.push('/profile');
  }

  const handleSignIn = () => {
    history.push('/signin');
  }

  return (
    <div>
      <AppBar className={classes.header}>
        <Toolbar>
          <Link href='/' style={{ cursor: 'pointer' }}>
            <div className={classes.logo}>
              <img src={logo} alt="logo" width={50} height={50} />
            </div>
          </Link>

          <Link href='/' style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <Typography className={classes.name}>My Coin</Typography>
          </Link>

          <div className={classes.grow} />

          {isLoggedIn
            ? <React.Fragment>
              <Button className={classes.button} variant="contained" onClick={handleProfile}>
                <Typography className={classes.buttonText}>
                  Profile
                  </Typography>
              </Button>
              <Button className={classes.button} variant="contained" onClick={handleSignOut}>
                <Typography className={classes.buttonText}>
                  Sign Out
                  </Typography>
              </Button>
            </React.Fragment>
            : <React.Fragment>
              <Button className={classes.button} variant="contained" onClick={handleSignIn}>
                <Typography className={classes.buttonText}>
                  Login
                </Typography>
              </Button>
            </React.Fragment>}
        </Toolbar>
      </AppBar>
    </div >
  );
}