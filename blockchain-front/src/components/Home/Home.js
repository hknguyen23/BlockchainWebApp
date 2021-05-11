import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Button, Typography, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CreateIcon from '@material-ui/icons/Create';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '50px',
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  title: {
    marginTop: '30px',
    fontSize: '36pt'
  },
  text: {
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center',
    fontSize: '16pt'
  },
  icon: {
    width: '30px',
    height: '30px',
    color: 'white'
  }
}));

export default function Home({ isLoggedIn, user, wallet }) {
  const classes = useStyles();
  const history = useHistory();

  const handleAddTransaction = () => {
    history.push('/transactions/add');
  }

  const handleViewTransactions = () => {
    history.push('/transactions/view');
  }

  const handleGetMoney = () => {
    history.push('/getMoney');
  }

  if (!isLoggedIn) {
    return <Redirect to='/signin'></Redirect>;
  }

  return (
    <React.Fragment>
      <Typography className={classes.title}>WELCOME TO MY COIN</Typography>
      <div className={classes.container}>

        <div className={classes.text}>
          <Typography>
            Username: {user.Username}
          </Typography>
          <Typography>
            Your current money: {wallet.TotalCount}
          </Typography>
        </div>

        <div style={{ float: 'right', display: 'flex', justifyContent: 'center', marginLeft: '100px' }}>
          <div>
            <Tooltip title="Add a transaction" aria-label="Add a transaction">
              <Button onClick={handleAddTransaction} style={{
                width: '100px', height: '150px', backgroundColor: '#0788ba',
                borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px',
                borderTopRightRadius: '0px', borderBottomRightRadius: '0px'
              }}
              >
                <CreateIcon className={classes.icon} />
              </Button>
            </Tooltip>
          </div>
          <div style={{ width: '100px' }}>
            <Tooltip title="View your transaction history" aria-label="View your transaction history">
              <Button onClick={handleViewTransactions} style={{
                width: '100px', height: '75px', backgroundColor: '#fda92c',
                borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px',
                borderTopRightRadius: '30px', borderBottomRightRadius: '0px'
              }}
              >
                <AccountBalanceWalletIcon className={classes.icon} />
              </Button>
            </Tooltip>
            <Tooltip title="Get money" aria-label="Get money">
              <Button onClick={handleGetMoney} style={{
                width: '100px', height: '75px', backgroundColor: '#fda92c',
                borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px',
                borderTopRightRadius: '0px', borderBottomRightRadius: '30px'
              }}
              >
                <MonetizationOnIcon className={classes.icon} />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}