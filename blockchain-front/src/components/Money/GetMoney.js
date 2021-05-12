import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '30px',
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  text: {
    marginTop: '30px',
    marginBottom: 'auto',
    fontSize: '14pt'
  },
}));

export default function GetMoney({ user }) {
  const classes = useStyles();
  const [money, setMoney] = useState(user.wallet.TotalCount);

  const handleChangeMoney = () => {

  }

  return (
    <React.Fragment>
      <div className={classes.text}>
        Your current money: {money}
      </div>
      <div className={classes.container} >
        <Button
          onClick={e => setMoney(money - 1)}
          style={{ margin: '20px', fontSize: '30px', color: 'red', border: '1px solid red' }}
        >
          -
          </Button>
        <Button
          onClick={e => setMoney(money + 1)}
          style={{ margin: '20px', fontSize: '30px', color: 'green', border: '1px solid green' }}
        >
          +
          </Button>
      </div>
      <Button style={{ border: '1px solid #fda92c' }} onClick={handleChangeMoney}>OK</Button>

    </React.Fragment>
  );
}