import  {api} from "misc/requests";
import config from "config";
import storage, {keys} from "misc/storage";

import {
  REQUEST_POSTS, RECEIVE_POSTS, ERROR_POSTS,
  REQUEST_DELETE_POST, SUCCESS_DELETE_POST, ERROR_DELETE_POST,
  REQUEST_POST, RECEIVE_POST, ERROR_POST,
  REQUEST_UPDATE_POST, RECEIVE_UPDATE_POST, ERROR_UPDATE_POST,
  REQUEST_CREATE_POST, RECEIVE_CREATE_POST, ERROR_CREATE_POST,

} from "../constants/postsActionTypes";

const { POST_SERVICE, } = config;

const getStoredPosts = () => {
  const stored = storage.getItem(keys.POSTS);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

// 3.1
const requestPosts = () => ({ type: REQUEST_POSTS });
const receivePosts = (posts) => ({ type: RECEIVE_POSTS, payload: posts });
const errorPosts = (error) => ({ type: ERROR_POSTS, payload: error });
//3.2
const requestDeletePost = () => ({ type: REQUEST_DELETE_POST });
const successDeletePost = (id) => ({ type: SUCCESS_DELETE_POST, payload: id });
const errorDeletePost = (error) => ({ type: ERROR_DELETE_POST, payload: error });

// 4
export const requestPost = () => ({ type: REQUEST_POST });
export const receivePost = (post) => ({ type: RECEIVE_POST, payload: post });
export const errorPost = (error) => ({ type: ERROR_POST, error });

export const requestUpdatePost = () => ({ type: REQUEST_UPDATE_POST });
export const receiveUpdatePost = (post) => ({ type: RECEIVE_UPDATE_POST, payload: post });
export const errorUpdatePost = (error) => ({ type: ERROR_UPDATE_POST, error });

export const requestCreatePost = () => ({ type: REQUEST_CREATE_POST });
export const receiveCreatePost = (post) => ({ type: RECEIVE_CREATE_POST, payload: post });
export const errorCreatePost = (error) => ({ type: ERROR_CREATE_POST, error });

//3.1
export const fetchPosts = ({
  page = 0,
  size = 10,
  minRating = null,
  countries = [],
  categories = [],
} = {}) => (dispatch) => {

  dispatch(requestPosts());

  const postQueryDto = {
    from: page,
    size,
    minRating,
    country: countries.length ? countries.join(',') : null,
    category: categories.length ? categories.join(',') : null,
  };

  return api.post(`${POST_SERVICE}/_list`, postQueryDto)
    .catch(() => {
      let filteredPosts = getStoredPosts();

      if (minRating) {
        filteredPosts = filteredPosts.filter((post) => post.rating >= minRating);
      }
      if (countries.length) {
        filteredPosts = filteredPosts.filter((p) => countries.includes(p.country));
      }
      if (categories.length) {
        filteredPosts = filteredPosts.filter(
          (p) => Array.isArray(p.categories) && p.categories.some((c) => categories.includes(c))
        );
      }

      const totalElements = filteredPosts.length;
      const totalPages = Math.ceil(totalElements / size) || 1;
      const start = page * size;
      const end = start + size;
      const list = filteredPosts.slice(start, end);
      console.log("post list in catch ", list);

      return { list, totalElements, totalPages };
    })
    .then((res) => {
      const postsList = res?.data?.list ?? res.list ?? [];
      const totalCount = res?.data?.totalElements ?? res.totalElements ?? postsList.length;
      const pages = res?.data?.totalPages ?? res.totalPages ?? (Math.ceil(totalCount / size) || 1);

      console.log("postList in then ", postsList);

      dispatch(receivePosts({ postsList, page, size, totalPages: pages, totalCount }));
    })
    .catch((errors) => dispatch(errorPosts(errors)));
};


//3.2
export const deletePost = (id) => (dispatch) => {
  dispatch(requestDeletePost());
  return api.delete(`${POST_SERVICE}/${id}`)
    .catch(() => {
      const posts = getStoredPosts();

      const index = posts.findIndex(p => p.id === id);
      if (index !== -1) {
        posts.splice(index, 1);
        return { data: { success: true }, posts };
      }
      return Promise.reject([{ code: 'DELETE_FAILED' }]);
    })
    .then((resp) => {
      if (resp.posts) {
        storage.setItem('POSTS', JSON.stringify(resp.posts));
      }
      dispatch(successDeletePost(id));
    })
    .catch((error) => {
      dispatch(errorDeletePost(error));
    });
};

// 4.2
export const fetchPostById = (id) => (dispatch) => {
  dispatch(requestPost());
  return api.get(`${POST_SERVICE}/${id}`)
    .catch(() => {
      const posts = getStoredPosts();
      const post = posts.find(p => String(p.id) === String(id));
      if(post) {
        return {data: post};
      }
      return Promise.reject([{code: 'NOT_FOUND' }]);      
    })
    .then((resp) => {
      const data = resp?.data ?? resp;
      dispatch(receivePost(data));
    })
    .catch((error) => {
      dispatch(errorPost(error));
    });
};

export const updatePostById = (id, dto) => (dispatch) => {
  dispatch(requestUpdatePost());
  const posts = getStoredPosts();

  return api.put(`${POST_SERVICE}/${id}`, dto)
    .catch(() => {
      const idx = posts.findIndex(p => String(p.id) === String(id));
      if (idx >= 0) {
        const updatedPost = { ...posts[idx], ...dto, id };

        const next = [...posts];
        next[idx] = updatedPost;
        storage.setItem(keys.POSTS, JSON.stringify(next));

        return { data: updatedPost };
      }
      return Promise.reject([{ code: "UPDATE_FAILED" }]);
    })
    .then((resp) => {
      const data = resp?.data ?? resp;
      dispatch(receiveUpdatePost(data));
    })
    .catch((error) => {
      dispatch(errorUpdatePost(error));
    });
};


export const createPost = (dto) => (dispatch) => {
  dispatch(requestCreatePost());

  return api.post(`${POST_SERVICE}`, dto)
    .catch(() => {
      const tempId = Date.now();
      const today = new Date();
      const createdAt = today.toISOString().split("T")[0];

      const createdPost = {
        ...dto,
        id: tempId,
        createdAt,
        rating: 5,
        userId: 4,
      };

      const stored = storage.getItem(keys.POSTS);
      const posts = stored ? JSON.parse(stored) : [];
      const next = [createdPost, ...posts];
      storage.setItem(keys.POSTS, JSON.stringify(next));

      return { data: createdPost };
    })
    .then((resp) => {
      const data = resp?.data ?? resp;
      dispatch(receiveCreatePost(data));
      return data;
    })
    .catch((error) => {
      dispatch(errorCreatePost(error));
    });
};