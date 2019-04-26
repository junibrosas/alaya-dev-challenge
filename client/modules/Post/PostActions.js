import callApi from '../../util/apiCaller';

export const SET_POST = 'SET_POST';
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const SET_POST_COMMENTS = 'SET_POST_COMMENTS';
export const LOADING_COMMENT = 'LOADING_COMMENT';

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function setComments(comments) {
  return {
    type: SET_POST_COMMENTS,
    comments,
  };
}

export function setGuiLoadingComment(isLoading) {
  return {
    type: LOADING_COMMENT,
    isLoading,
  };
}


/**
 * API Action Thunks
 */

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function fetchPostComments(postId) {
  return (dispatch) => {
    return callApi(`comment/${postId}`, 'get')
      .then((res) => dispatch(setComments(res.comments)));
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    }).then(res => dispatch(addPost(res.post)));
  };
}

export function addCommentRequest(comment) {
  const { author, content, postId } = comment;

  return (dispatch) => {
    dispatch(setGuiLoadingComment(true));
    return callApi('comment', 'post', {
      comment: {
        postId,
        author,
        content,
      } })
      .then(() => {
        dispatch(setGuiLoadingComment(false));
        dispatch(fetchPostComments(postId));
      });
  };
}

export function likePost(postId) {
  return (dispatch) => {
    return callApi('like', 'post', { postId })
      .then(res => dispatch(addPost(res.result)));
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete')
      .then(() => dispatch(deletePost(cuid)));
  };
}
