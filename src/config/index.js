const config = {
  BLOG_GATEWAY: process.env.REACT_APP_BLOG_GATEWAY || 'http://localhost:1000',
  POST_SERVICE: process.env.REACT_APP_POST_SERVICE || '/api/post',
  USER_SERVICE: process.env.REACT_APP_USER_SERVICE || '/api/user',
  COMMENT_SERVICE: process.env.REACT_APP_COMMENT_SERVICE || '/api/comment',
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
};

export default config;
