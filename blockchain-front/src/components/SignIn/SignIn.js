import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signInUser } from '../../services/UserService';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ isLoggedIn, setIsLoggedIn }) {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password
    }

    signInUser(data)
      .then(result => {
        if (result.success) {
          localStorage.setItem('userID', result.user.ID);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          window.alert(result.msg);
        }
      })
      .catch(error => {
        history.push('/error', { errorMessage: error });
      });
  }

  const signUpClicked = () => {
    history.push('/signup');
  }

  if (isLoggedIn) {
    return <Redirect to='/'></Redirect>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField id="username" name="username" label="Username" variant="outlined"
            margin="normal" required fullWidth autoComplete="username" autoFocus
            onChange={e => setUsername(e.target.value)}
          />
          <TextField id="password" name="password" label="Password" type="password"
            variant="outlined" margin="normal" required fullWidth autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={signUpClicked} variant="body2" style={{ cursor: 'pointer' }}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}