import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Snackbar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { addTransaction } from '../../services/TransactionService';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '30px',
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center'
  },
  text: {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: '14pt'
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function AddTransaction({ wallet }) {
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState({
    receiver: '',
    amount: '',
  });
  const [errors, setErrors] = useState({
    receiver: '',
    amount: ''
  });
  const [isError, setIsError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSuccessRequest, setIsSuccessRequest] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleValidate = (e) => {
    if (!e.target.value) {
      setErrors({
        ...errors,
        [e.target.name]: '* Must not be empty'
      });
    } else {
      if (e.target.name === 'amount') {
        setErrors({
          ...errors,
          amount: isNaN(e.target.value) ? '* Must be a number' : ''
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: ''
        });
      }
    }
  }

  const handleChangeValues = (e) => {
    setIsError(false);
    if (e.target.value) {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = { ...errors }
    if (values.receiver === '') {
      tempErrors.receiver = '* Must not be empty';
    } else if (values.receiver === wallet.PublicKey) {
      tempErrors.receiver = '* You can\'t send coins to yourself';
    }
    if (values.amount === '') {
      tempErrors.amount = '* Must not be empty';
    } else if (isNaN(values.amount)) {
      tempErrors.amount = '* Must be a number';
    }

    setErrors(tempErrors);
    const errorList = Object.entries(tempErrors);
    const hasError = errorList.filter((v) => v[1] !== '').length > 0;
    if (hasError) {
      setIsError(true);
      window.scrollTo(0, 0);
    } else {
      const data = {
        senderAddress: wallet.PublicKey,
        receiverAddress: values.receiver,
        amount: +values.amount
      }

      addTransaction(data)
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
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  return (
    <React.Fragment>
      <h1>Add a transaction</h1>

      <div className={classes.container}>
        <Typography hidden={!isError} style={{ width: '50%', color: 'red' }} >
          * Please make sure all the mandatory field filled and no errors
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField id="receiver" name="receiver" label="Receiver Address" variant="outlined"
            size="small" margin="normal" required fullWidth autoFocus
            helperText={errors.receiver}
            error={errors.receiver}
            onChange={handleChangeValues}
            onBlur={handleValidate}
          />
          <TextField id="amount" name="amount" label="Amount" variant="outlined"
            size="small" margin="normal" required fullWidth
            helperText={errors.amount}
            error={errors.amount}
            onChange={handleChangeValues}
            onBlur={handleValidate}
          />
          <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary"
            style={{ marginTop: '10px' }}
          >
            Proceed
          </Button>
        </form>
      </div>

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