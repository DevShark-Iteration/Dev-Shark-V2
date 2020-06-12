import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  Button,
  TextField
} from '@material-ui/core';

import axios from 'axios';

// Add styling rules here
const useStyles = makeStyles((theme) => ({
  floatedAdd: {
    position: 'fixed',
    bottom: 50,
    right: 60,
  },
  floatedForm: {
    position: 'absolute',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    padding: theme.spacing(5),
    boxShadow: theme.shadows[5],
    outline: 0,
    width: 500,
    backgroundColor: theme.palette.background.paper,
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '& > *': {
      margin: theme.spacing(1, 0),
    },
  },
  formControl: {
    minWidth: 175,
  },
}));

const RedTextTypography = withStyles({
  root: {
    color: "#d92027"
  }
})(Typography);

const StyledButton = withStyles({
  root: {
    backgroundColor: 'white',
    color: 'black',
  }
})(Button);

const Login = (props) => {
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [invalidLogin, setInvalidLogin] = useState(false);

  const toggleLogin = (e) => {
    if (loginOpen === false) {
      setSignupOpen(false);
    }
    setLoginOpen(loginOpen ? false : true);
    clearForm();
  };

  const toggleSignup = (e) => {
    if (signupOpen === false) {
      setLoginOpen(false);
    }
    setSignupOpen(signupOpen ? false : true);
    clearForm();
  }

  const handleChange = (e) => {
    let inputVal = e.target.value;
    switch (e.target.name) {
      case 'loginUser':
        setLoginEmail(inputVal);
        break;
      case 'loginPassword':
        setLoginPassword(inputVal);
        break;
      case 'signupUser':
        setSignupEmail(inputVal);
        break;
      case 'signupPassword':
        setSignupPassword(inputVal);
        break;

    }
  };

  const clearForm = () => {
    // doing extra work, could be refactored later
    setLoginEmail('');
    setLoginPassword('');
    setSignupEmail('');
    setSignupPassword('');
    setInvalidLogin(false);
  };

  const handleLogin = (e) => {
    console.log('click fired on handleLogin')
    e.preventDefault();
    axios.post('/user', { email: loginEmail, password: loginPassword})
    .then(response => {
      props.login(loginEmail, loginPassword);
      setLoginOpen(false);
      clearForm();
    }).catch(function (error) {
      setInvalidLogin(true);
    });
  }

  const handleSignup = (e) => {
    console.log('click fired on handleSignup');
    e.preventDefault();
    setSignupOpen(false);
    console.log(signupEmail);
    console.log(signupPassword);
    clearForm();
    return;
  }

  const loginBody = (
    <div className={classes.paper}>
      <Typography variant="h5">User Login</Typography>
      {invalidLogin ? <RedTextTypography variant="subtitle1">Invalid</RedTextTypography> : null}
      <TextField
        required
        name="loginUser"
        label="Email"
        fullWidth
        value={loginEmail}
        variant="outlined"
        onChange={handleChange}
      />

      <TextField
        required
        name="loginPassword"
        label="Password"
        type="password"
        fullWidth
        value={loginPassword}
        variant="outlined"
        onChange={handleChange}
      />
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={toggleSignup}>Sign Up</Button>
    </div>
  )

  const signupBody = (
    <div className={classes.paper}>
      <Typography variant="h5">Sign Up</Typography>
      <TextField
        required
        name="signupUser"
        label="Email"
        fullWidth
        value={signupEmail}
        variant="outlined"
        onChange={handleChange}
      />

      <TextField
        required
        name="signupPassword"
        label="Password"
        type="password"
        fullWidth
        value={signupPassword}
        variant="outlined"
        onChange={handleChange}
      />
      <Button onClick={toggleLogin}>Back to Login</Button>
      <Button onClick={handleSignup}>Submit</Button>
    </div>
  )

  return (
    <div>
      <div onClick={toggleLogin}>
        <StyledButton variant="outlined">
          {/* <AddIcon className={classes.extendedIcon} /> */}
          Login
        </StyledButton>
      </div>
      <div className={classes.floatedForm}>
        <Modal open={loginOpen} onClose={toggleLogin} >
          {loginBody}
        </Modal>
        <Modal open={signupOpen} onClose={toggleSignup} >
          {signupBody}
        </Modal>
      </div>
    </div>
  )
}

export default Login


