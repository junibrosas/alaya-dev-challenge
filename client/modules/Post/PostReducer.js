import { ADD_POST, ADD_POSTS, DELETE_POST, SET_POST_COMMENTS, LOADING_COMMENT } from './PostActions';

const initialState = {
  data: [],
  comments: [],
  gui: {
    isLoadingComment: false,
  },
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

    case LOADING_COMMENT:
      return {
        ...state,
        gui: {
          ...state.gui,
          isLoadingComment: action.isLoading,
        },
      };

    default:
      return state;
  }
};


/**
 * State Selectors
 */

export const getPosts = state => state.posts.data;
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];
export const getPostComments = (state) => state.posts.comments;
export const getGui = (state) => state.posts.gui;

export default PostReducer;
