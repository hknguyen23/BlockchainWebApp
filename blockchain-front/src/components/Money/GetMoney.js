import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { updateWallet } from '../../services/WalletService';

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

export default function GetMoney({ wallet }) {
  const classes = useStyles();
  const history = useHistory();
  const [money, setMoney] = useState(wallet.Balance);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSuccessRequest, setIsSuccessRequest] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChangeMoney = () => {
    const data = {
      publicKey: wallet.PublicKey,
      money
    }
    updateWallet(data)
      .then(result => {
        setIsSuccessRequest(result.success);
        setOpenSnackbar(true);
        if (result.success) {
          setResponseMessage('Successfully proceeded');
        } else {
          setResponseMessage(result.msg);
        }
      })
      .catch(error => {
        history.push('/error', { errorMessage: error });
      });
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity={isSuccessRequest ? "success" : "error"}
          color={isSuccessRequest ? "success" : "error"}
          variant="filled"
        >
          {responseMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}