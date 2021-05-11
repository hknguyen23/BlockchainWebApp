import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  Typography,
  AppBar,
  Toolbar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import logo from '../../resources/images/logo192.png';
// import '../Style/Header.css';

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
    fontSize: '14pt',
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

  return (
    <div>
      <AppBar className={classes.header}>
        <Toolbar>
          <Link to='/' style={{ cursor: 'pointer' }}>
            <div className={classes.logo}>
              <img src={logo} alt="logo" width={50} height={50} />
            </div>
          </Link>

          <Link to='/' style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <Typography className={classes.name}>My Coin</Typography>
          </Link>

          <div className={classes.grow} />

          {isLoggedIn
            ? <React.Fragment>
              <Button className={classes.button} variant="contained">
                <Link to='/profile' style={{ textDecoration: 'none' }}>
                  <Typography className={classes.buttonText}>
                    Profile
                  </Typography>
                </Link>
              </Button>
              <Button className={classes.button} variant="contained">
                <Link style={{ textDecoration: 'none' }} onClick={handleSignOut}>
                  <Typography className={classes.buttonText}>
                    Sign Out
                  </Typography>
                </Link>
              </Button>
            </React.Fragment>
            : <React.Fragment>
              <Button className={classes.button} variant="contained">
                <Link to='/signin' style={{ textDecoration: 'none' }}>
                  <Typography className={classes.buttonText}>
                    Login
                  </Typography>
                </Link>
              </Button>
            </React.Fragment>}
        </Toolbar>
      </AppBar>
    </div >
  );
}