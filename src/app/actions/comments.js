import { api } from "misc/requests";
import config from "config";

import {
  REQUEST_COMMENTS, RECEIVE_COMMENTS, ERROR_COMMENTS,
  REQUEST_CREATE_COMMENT, RECEIVE_CREATE_COMMENT, ERROR_CREATE_COMMENT,
} from "../constants/commentsActionTypes";

const { COMMENT_SERVICE } = config;

const requestComments = () => ({ type: REQUEST_COMMENTS });
const receiveComments = (comments) => ({ type: RECEIVE_COMMENTS, payload: comments });
const errorComments = (error) => ({ type: ERROR_COMMENTS, error });

export const requestCreateComment = () => ({ type: REQUEST_CREATE_COMMENT });
export const receiveCreateComment = (comment) => ({ type: RECEIVE_CREATE_COMMENT, payload: comment });
export const errorCreateComment = (error) => ({ type: ERROR_CREATE_COMMENT, error });

export const fetchCommentsByPostId = (postId, size = 10, from = 0) => (dispatch) => {
  dispatch(requestComments());

  return api.get(`${COMMENT_SERVICE}?postId=${postId}&size=${size}&from=${from}`)
    .then((res) => {
      const comments = res?.data ?? [];
      dispatch(receiveComments(comments));
    })
    .catch((error) => {
      dispatch(errorComments(error));
    });
};

export const createComment = (dto) => (dispatch) => {
  dispatch(requestCreateComment());

  return api.post(`${COMMENT_SERVICE}`, dto)
    .then((res) => {
      const comment = res?.data ?? dto;
      dispatch(receiveCreateComment(comment));
      return comment;
    })
    .catch((error) => {
      dispatch(errorCreateComment(error));
    });
};