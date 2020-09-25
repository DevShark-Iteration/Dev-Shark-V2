import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';
import { TramRounded } from '@material-ui/icons';

export let wantedTopic;

export  function NavItem({ topic, getFunc }) {

  const handClick = () => {
    console.log(topic,'first topic check' )
    wantedTopic=topic;
     getFunc(topic);
    console.log(topic, 'second topic check')
  }

  return (
    // each button item will send pass its respective topic to the function sending a GET request
    <ListItem button onClick={handClick}>
      <ListItemText primary={topic} />
    </ListItem>
  );
}

