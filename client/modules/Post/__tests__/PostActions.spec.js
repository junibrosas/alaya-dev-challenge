import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_POST,
  DELETE_POST,
  ADD_POSTS,
  SET_POST_COMMENTS,
  ADD_COMMENT,
  addPost,
  deletePost,
  addPosts,
  setComments,
  addComment,
} from '../PostActions';

const post = { name: 'Prashant', title: 'Hello Mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'", slug: 'hello-mern', _id: 1 };
const comment = { author: 'john', content: 'hello world' };

test('should return the correct type for addPost', actionTest(
  addPost,
  post,
  { type: ADD_POST, post },
));

test('should return the correct type for deletePost', actionTest(
  deletePost,
  post.cuid,
  { type: DELETE_POST, cuid: post.cuid },
));

test('should return the correct type for addPosts', actionTest(
  addPosts,
  [post],
  { type: ADD_POSTS, posts: [post] },
));

test('should return the correct type for setComments', actionTest(
  setComments,
  [comment],
  { type: SET_POST_COMMENTS, comments: [comment] },
));

test('should return the correct type for addComment', actionTest(
  addComment,
  comment,
  { type: ADD_COMMENT, comment },
));
