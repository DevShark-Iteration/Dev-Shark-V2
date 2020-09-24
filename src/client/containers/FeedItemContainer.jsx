import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';

import FeedItem from '../components/FeedItem';
;
/*

Renders a container showing all feed items related to a certain topic

A resource's name, id, url, description, likes and liked values are mapped from the resources array that is passed down as a prop from the parent component

Upvote and downvote functions are passed down directly as props from the parent component

*/

const FeedItemContainer = (props) => {

  // useEffect(() => {
  //   // call new action to get topics
  //   props.getTopics();
  //   props.getResources(props.currentTopic);
  // }, []);

  const resources = props.resources;
  const items = resources.map((elem, index) => {
    let favBoolean = false;

    if (props.favoriteResources.includes(elem.resources_id)) {
      favBoolean = true;
    }

    return (

        <FeedItem
          favoriteResources={props.favoriteResources}
          favBoolean={favBoolean}
          name={elem.name}
          url={elem.url}
          description={elem.description}
          likes={elem.likes}
          id={elem.resources_id}
          key={index}
          tech={elem.tech}
          upvote={props.upvote}
          downvote={props.downvote}
          liked={elem.liked}
          addFav={props.addFav}
          deleteFav={props.deleteFav}
          isLoggedIn={props.isLoggedIn}
        />


    );
  });
  return <div>{items}</div>;
};

export default FeedItemContainer;
