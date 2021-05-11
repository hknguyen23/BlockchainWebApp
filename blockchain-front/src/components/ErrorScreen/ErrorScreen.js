import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import '../Style/ErrorScreen.css';
import errorImage from '../../resources/images/error.png';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  error: {
    width: '20%',
    height: '20%'
  },
  text: {
    marginTop: 'auto',
    marginBottom: 'auto',
    minWidth: '300px',
    textAlign: 'left'
  }
}));

export default function ErrorScreen() {
  const location = useLocation();
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.container}>
        <img src={errorImage} alt="error" className={classes.error} />
        <div className={classes.text}>
          <div>
            <Typography>
              Unexpected error occurred
            </Typography>
          </div>
          <div>
            <Typography style={{ color: 'red' }}>
              {location.state == null ? 'This is an error' : location.state.errorMessage.toString()}
            </Typography>
          </div>
          <Typography>
            Please contact your administrator
          </Typography>
          <p></p>
          <div>
            <Typography>
              or
              &nbsp;
              <Link to="/">
                back to home page
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}