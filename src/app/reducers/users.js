import {
  REQUEST_USERS,
  RECEIVE_USERS,
  ERROR_USERS,
} from 'app/constants/usersActionTypes';

const initialState = {
  usersList: [],
  isLoading: false,
  error: null,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USERS:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case RECEIVE_USERS:
      return {
        ...state,
        isLoading: false,
        usersList: action.payload,
      };
    case ERROR_USERS:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}