import { ADD_POST, ADD_POSTS, DELETE_POST, SET_POST_COMMENTS } from './PostActions';

const initialState = {
  data: [],
  comments: [],
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_POST:
      return {
        ...state,
        data: [action.post],
      };

    case ADD_POSTS:
      return {
        ...state,
        data: action.posts,
      };

    case DELETE_POST:
      return {
        ...state,
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    case SET_POST_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Get comments related to a post
export const getPostComments = (state) => state.posts.comments;

export default PostReducer;
