import {
  REQUEST_COMMENTS, RECEIVE_COMMENTS, ERROR_COMMENTS,
  REQUEST_CREATE_COMMENT, RECEIVE_CREATE_COMMENT, ERROR_CREATE_COMMENT,
} from "../constants/commentsActionTypes";

const initialState = {
  commentsList: [],
  isLoading: false,
  error: null,
  isSaving: false,
  errorSaving: null,
};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return { ...state, isLoading: true, error: null };

    case RECEIVE_COMMENTS:
      return { ...state, isLoading: false, commentsList: action.payload };

    case ERROR_COMMENTS:
      return { ...state, isLoading: false, error: action.error };

    case REQUEST_CREATE_COMMENT:
      return { ...state, isSaving: true, errorSaving: null };

    case RECEIVE_CREATE_COMMENT:
      return {
        ...state,
        isSaving: false,
        commentsList: [action.payload, ...state.commentsList],
      };

    case ERROR_CREATE_COMMENT:
      return { ...state, isSaving: false, errorSaving: action.error };

    default:
      return state;
  }
}