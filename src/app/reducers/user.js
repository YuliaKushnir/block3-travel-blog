import {
  RECEIVE_USER,
  REQUEST_USER,
  AUTH_ERROR,
} from '../constants/actionTypes';

const initialState = {
  user: null,
  isAuthenticated: false,
  isFetchingUser: false,
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    
    case RECEIVE_USER: {
      return {
        ...state,
        isAuthenticated: true,
        isFetchingUser: false,
        user: action.payload,
      };
    }

    case REQUEST_USER: {
      return {
        ...state,
        isFetchingUser: true,
      };
    }

    case AUTH_ERROR: {
      return initialState
    }

    default: {
      return state;
    }
  }
}
