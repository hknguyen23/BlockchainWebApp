import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  text: {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: '14pt'
  },
}));

export default function Profile({ user }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Typography className={classes.text}>
          Hi, {user.Name}
        </Typography>
      </div>
    </React.Fragment>
  );
}