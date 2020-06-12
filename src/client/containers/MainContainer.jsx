import React from 'react';
import { Container, Typography, AppBar, Tabs, Tab, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavContainer from './NavContainer';
import FeedContainer from './FeedContainer';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import Login from '../components/Login';
import Logout from '../components/Logout';

// generate object to hold our custom stylings
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // header of entire app spans across the top
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: theme.zIndex.drawer + 1,
    padding: theme.spacing(2),
  },
  header: {
    fontWeight: 600,
    fontSize: 36,
  },
  subHeader: {

    marginLeft: theme.spacing(12),
    fontSize: 25
  },
  loginButton: {
    display: 'inline',
    marginLeft: '50%',
    border: '1px solid',
  },
  logoutButton: {
    display: 'inline',
    marginLeft: '50%',
    border: '1px solid',
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
    fontSize: 12
  },
  email: {
    paddingRight: '10px'
  }
}));

const mapStateToProps = (state) => ({
  //add pertinent state
  resources: state
})

const mapDispatchToProps = (dispatch) => ({
  //set up action dispathes
  login: (email, password) => { dispatch(actions.login(email, password)) },
  logout: () => dispatch(actions.logout()),

  getResources: (tech_name) => {
    dispatch(actions.getResource(tech_name));
    dispatch(actions.updateTopic(tech_name));
  },
  getTopics: () => {
    dispatch(actions.getTopics());
  },
})

// holds our top header bar, as well as our side bar (drawer), will also hold our feed container
const MainContainer = (props) => {
  const classes = useStyles();
  // functions as css-reset

  console.log('Props', props)
  console.log(`RESOURCES: ${props.resources.currentUser}`)
  console.log(`LOGGED IN: ${props.resources.isLoggedin}`)
  console.log(`RESOURCES 2: ${props.resources.resources}`)

  return (
    <Container maxWidth="lg" className={classes.root}>
      {/* AppBar, where the title of website is, stays on top*/}
      <AppBar position="fixed" className={classes.appBar}>
        <Typography variant="h1" align="left" className={classes.header}>
          {'</DevShark>'}
        </Typography>
        <Typography variant="h2" className={classes.header}>
          Developer Resource Aggregator
          </Typography>

        <Typography variant="inherit" className={classes.loginContainer}>
          <p className={classes.email}>{props.resources.isLoggedin ? props.resources.currentUser.email : null}</p>
          {props.resources.isLoggedin ?
            <Logout variant="contained" color="primary" className={classes.logoutButton} logout={props.logout} resources={props.getResources} topics={props.getTopics} /> :
            <Login variant="contained" color="primary" className={classes.loginButton} login={props.login} />
          }
        </Typography>

      </AppBar>

      {/* Drawer is our sidebar navigation component, stays permanently fixed to side, as docs recommend on desktop usage */}
      <div className={classes.offset}></div>
      <NavContainer />
      <FeedContainer />
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer); 
