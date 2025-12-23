import {
  REQUEST_POSTS, RECEIVE_POSTS, ERROR_POSTS,
  REQUEST_DELETE_POST, SUCCESS_DELETE_POST, ERROR_DELETE_POST,
  REQUEST_POST, RECEIVE_POST, ERROR_POST,
  REQUEST_UPDATE_POST, RECEIVE_UPDATE_POST, ERROR_UPDATE_POST,
  REQUEST_CREATE_POST, RECEIVE_CREATE_POST, ERROR_CREATE_POST,

} from "../constants/postsActionTypes";

const initialState = {
  postsList: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
  isDeleting: false,
  deleteError: null,
  deleteSuccess: null,
  currentPost: null,
  isFetchingCurrent: false,
  isSaving: false,
  errorCurrent: null,
  errorSaving: null,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return { ...state, isLoading: true, error: null };
    case RECEIVE_POSTS:
      return {
        ...state,
        isLoading: false,
        postsList: action.payload.posts,
        currentPage: action.payload.page,
        pageSize: action.payload.size,
        totalPages: action.payload.totalPages,

      };
    case ERROR_POSTS:
      return { ...state, isLoading: false, error: action.payload };

    case REQUEST_DELETE_POST:
      return {
        ...state,
        isDeleting: true,
        deleteError: null,
        deleteSuccess: null,
      };
    case SUCCESS_DELETE_POST:
      const newList = state.postsList.filter((p) => p.id !== action.payload);
      console.log("SUCCESS_DELETE_POST", action.payload, newList);
      return {
        ...state,
        isDeleting: false,
        postsList: newList,
        deleteSuccess: "Допис успішно видалено",
      };
    case "CLEAR_DELETE_SUCCESS":
      return { ...state, deleteSuccess: null };
    case ERROR_DELETE_POST:
      return { ...state, isDeleting: false, deleteError: action.payload };

    case REQUEST_POST:
      return { ...state, isFetchingCurrent: true, errorCurrent: null };
    case RECEIVE_POST:
      return { ...state, isFetchingCurrent: false, currentPost: action.payload };
    case ERROR_POST:
      return { ...state, isFetchingCurrent: false, errorCurrent: action.error };

    case REQUEST_UPDATE_POST:
    case REQUEST_CREATE_POST:
      return { ...state, isSaving: true, errorSaving: null };

    case RECEIVE_UPDATE_POST:
    case RECEIVE_CREATE_POST:
      return { ...state, isSaving: false, currentPost: action.payload };

    case ERROR_UPDATE_POST:
    case ERROR_CREATE_POST:
      return { ...state, isSaving: false, errorSaving: action.error };

    default:
      return state;
  }
}
