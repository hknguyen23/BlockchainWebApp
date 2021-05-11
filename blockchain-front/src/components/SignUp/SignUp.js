import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const API_URL = "http://localhost:5000";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ setIsLoggedIn }) {
  const history = useHistory();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      username: username,
      email: email,
      password: password
    };

    fetch(API_URL + "/users/signUp/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setIsLoggedIn(true);
          history.push('/');
        } else {
          window.alert(result.msg);
        }
      })
      .catch(error => {
        history.push('/error', { errorMessage: error });
      });
  }

  const signInClicked = () => {
    history.push('/signIn');
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField id="name" name="name" label="Name" autoComplete="name"
                variant="outlined" required fullWidth autoFocus
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField id="username" name="username" label="Username" autoComplete="username"
                variant="outlined" required fullWidth
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField id="email" name="email" label="Email Address" autoComplete="email"
                variant="outlined" required fullWidth
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField id="password" name="password" label="Password" type="password"
                autoComplete="current-password" variant="outlined" required fullWidth
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button className={classes.submit} type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={signInClicked} variant="body2" style={{ cursor: 'pointer' }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}