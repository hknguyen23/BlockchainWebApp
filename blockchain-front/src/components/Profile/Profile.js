import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { getListTransactions } from '../../services/TransactionService';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '30px',
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  text: {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: '14pt'
  },
  title: {
    marginTop: '30px'
  }
}));

export default function Profile({ user, wallet }) {
  const classes = useStyles();
  const history = useHistory();
  const [transactionCount, setTransactionCount] = useState(0);

  useEffect(() => {
    getListTransactions(user.WalletAddress)
      .then(result => {
        setTransactionCount(result.transactions.length);
      })
      .catch(error => {
        history.push("/error", { errorMessage: error });
      });
  }, []);

  return (
    <React.Fragment>
      <h1 className={classes.title}>Your profile</h1>
      <div className={classes.container}>
        <Typography className={classes.text}>
          Hi, {user.Name}
        </Typography>
        <Typography className={classes.text}>
          Balance: {wallet.Balance}
        </Typography>
        <Typography className={classes.text}>
          Total transactions: {transactionCount}
        </Typography>
      </div>
    </React.Fragment>
  );
}