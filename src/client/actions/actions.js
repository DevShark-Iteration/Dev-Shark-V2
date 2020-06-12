import axios from 'axios';
import * as types from '../constants/actionTypes';

// Send a get request to server to retrieve topics
export const getTopics = () => {
  return (dispatch) => {
    axios.get('/resource/getTopics').then((response) => {
      for (let i = 0; i < response.data.length; i++){
        response.data[i] = response.data[i][0].toUpperCase() + response.data[i].slice(1)
      }
      dispatch({
        type: types.GET_TOPICS,
        payload: response.data,
      });
    });
  };
};

// Send get request to server for resource (tech name)
// Input: resource name
export const getResource = (resource) => {
  if (resource === 'Favorites'){
    return (dispatch) => {
      axios
        .get('/user/favorite')
        .then((response) => {
          
          dispatch({
            type:types.GET_RESOURCE,
            payload: response.data,
          })
        })
    }
  } else {
    return (dispatch) => {
      axios
        .get(`/resource/${resource.toLowerCase()}`)
        .then((response) => {
          dispatch({
            type: types.GET_RESOURCE,
            payload: response.data,
          });
        });
    };
  }
};

// Update the current topic to be rendered on screen (used once for initial load)
// Input: current topic (fetched from props)
export const updateTopic = (topic) => {
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_TOPIC,
      payload: topic,
    });
  };
};

// Send post request to server to add a new resource
// Input: resource name in the parameter and resource object to add to DB in body
export const addResource = (resource) => {
  return (dispatch) => {
    axios.post(`/resource`, resource).then((response) => {
      dispatch({
        type: types.ADD_RESOURCE,
        payload: response.data,
      });
    });
  };
};

// Send put request to increase like count
// Input: Id of the resource and the technology associated with the resource
export const upvote = (id, tech) => {
  return (dispatch) => {
    axios
      .put('/resource/upvote', { id: id, tech: tech })
      .then((response) => {
        dispatch({
          type: types.UPVOTE,
          payload: response.data,
        });
      });
  };
};

// Send put request to increase like count
// Input: Id of the resource and the technology associated with the resource
export const downvote = (id, tech) => {
  return (dispatch) => {
    axios
      .put('http://localhost:3000/resource/downvote', { id: id, tech: tech })
      .then((response) => {
        dispatch({
          type: types.DOWNVOTE,
          payload: response.data,
        });
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    axios
      .post('/user', { email: email, password: password})
      .then((response) => {
        console.log('RESPONSE IS', response)
        // look for status code in respons, if 200 send true to update isLoggedIn in state,
        // if bad status do something
        console.log(response, 'RESPONSE IN LOGIN')
        console.log(response.data, ' RESPONSE data  IN LOGIN')
        dispatch({
          type: types.LOGIN,
          payload: response.data,
        });
      });
  };
};

export const addFav = (resource_id) => {
  return (dispatch) => {
    axios
      .post('/user/favorite', {resources_id: resource_id})
      .then((response) => {
        dispatch({
          type: types.ADD_FAV,
          payload: response.data.favoriteResources
        });
      });
  };
};

export const deleteFav = (resource_id) => {
  return (dispatch) => {
    axios.delete('/user/favorite', {
      headers: {
        "Content-Type" : "application/json"
      },
      data: {
        "resources_id": resource_id
      }
    })
      .then((response) => {
        console.log(response, " RESPONSE IN DELETE FAV <<<<<<<<<<<<<<<<<<<")
        dispatch({
          type: types.DELETE_FAV,
          payload: response.data
        });
      });
  };
}

export const getUserInfo = () => {
  return (dispatch) => {
    axios
      .get('/user')
      .then((response) => {
        console.log(response, '<------------- RESPONSE IN GET USER INFO')
        dispatch({
          type: types.GET_USER_INFO,
          payload: response.data,
        })
      })
  }
}

export const logout = () => ({
  type: types.LOGOUT
})
