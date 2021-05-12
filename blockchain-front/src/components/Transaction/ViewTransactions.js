import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

export default function ViewTransactions() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.container}>
        VIEW TRANSACTIONS
      </div>
    </React.Fragment>
  );
}