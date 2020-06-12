import * as types from '../constants/actionTypes';

// Set initial state
const initialState = {
  isLoggedin: false,
  currentUser: {},
  favoriteResources: [],
  favoriteTechs: [],
  /*
  resources: [
    {
      name: '',
      id: 0,
      likes: 0,
      url: '',
      description: '',
      liked: false,
    },
  ],
  */
  resources: [],
  currentTopic: 'Javascript',
  topics: [],
  //favoriteResources: [7, 9],
};

const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    // Update state with array of topics
    case types.GET_TOPICS:
      return {
        ...state,
        topics: action.payload,
      };
    // Update state with array of resources
    case types.GET_RESOURCE:
      return {
        ...state,
        resources: action.payload,
      };
    // Update state with array of resources
    case types.UPDATE_TOPIC:
      return {
        ...state,
        currentTopic: action.payload,
      };
    // Update state with array of resources after adding one
    case types.ADD_RESOURCE:
      return {
        ...state,
        resources: action.payload,
      };
    // Update state with new number of upvotes
    case types.UPVOTE:
      // Backend returns an array of resource objects with the updated likes for each
      return {
        ...state,
        resources: action.payload,
      };
    // Update state with new number of upvotes
    case types.DOWNVOTE:
      // Backend returns one an array of resource objects with updated likes for each
      return {
        ...state,
        resources: action.payload,
      };
    case types.LOGIN:
      return {
        ...state,
        isLoggedin: true,
        currentUser: action.payload.currentUser,
        favoriteResources: action.payload.favResources,
        favoriteTechs: action.payload.favoriteTechs,
        topics: ['Favorites', ...state.topics]
      }
    case types.LOGOUT:
      const topics = [...state.topics];
      const newTopics = topics.slice(1);
      return {
        ...state,
        isLoggedin: false,
        currentUser: {},
        favoriteResources: [],
        favoriteTechs: [],
        topics: [...newTopics]
      }
      
    case types.ADD_FAV:
      return {
        ...state,
        favoriteResources: action.payload,
      }

    case types.DELETE_FAV:
      if (state.currentTopic === 'Favorites'){
        return {
          ...state,
          favoriteResources: action.payload.favoriteResources,
          resources: action.payload.resources
        }
      } else {
        return {
          ...state,
          favoriteResources: action.payload.favoriteResources
        }
      }

    case types.GET_USER_INFO:
      return {
        ...state,
        isLoggedin: true, // CHANGED
        favoriteResources: action.payload.favResources,
        topics: ['Favorites', ...state.topics],
        currentUser: { email: action.payload.email }

      }

    default:
      return state;
  }
};

export default resourceReducer;
