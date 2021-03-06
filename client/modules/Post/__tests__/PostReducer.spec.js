import test from 'ava';
import { reducerTest } from 'redux-ava';
import postReducer, { getPost, getPosts, getPostComments, getGui } from '../PostReducer';
import { addPost, deletePost, addPosts, setComments, setGuiLoadingComment } from '../PostActions';

test('action for ADD_POST is working', reducerTest(
  postReducer,
  { data: ['foo'] },
  addPost({
    name: 'prank',
    title: 'first post',
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-post',
  }),
  { data: [{
    name: 'prank',
    title: 'first post',
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-post',
  }] },
));

test('action for DELETE_POST is working', reducerTest(
  postReducer,
  { data: [{
    name: 'prank',
    title: 'first post',
    content: 'Hello world!',
    cuid: 'abc',
    _id: 1,
    slug: 'first-post',
  }] },
  deletePost('abc'),
  { data: [] },
));

test('action for ADD_POSTS is working', reducerTest(
  postReducer,
  { data: [] },
  addPosts([
    {
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      _id: null,
      cuid: null,
      slug: 'first-post',
    },
  ]),
  { data: [{
    name: 'prank',
    title: 'first post',
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-post',
  }] },
));

test('action for SET_POST_COMMENTS is working', reducerTest(
  postReducer,
  { comments: [] },
  setComments([
    {
      _id: null,
      cuid: null,
      postId: null,
      author: 'Captain America',
      dateAdded: '2019-04-26T02:31:39.339Z',
      content: 'I can do this all day.',
    },
  ]),
  { comments: [{
    _id: null,
    cuid: null,
    postId: null,
    author: 'Captain America',
    dateAdded: '2019-04-26T02:31:39.339Z',
    content: 'I can do this all day.',
  }] },
));

test('action for GUI_LOADING_COMMENT is working', reducerTest(
  postReducer,
  { gui: { isLoadingComment: false } },
  setGuiLoadingComment(true),
  { gui: { isLoadingComment: true } },
));

test('getPosts selector', t => {
  t.deepEqual(
    getPosts({
      posts: { data: ['foo'] },
    }),
    ['foo']
  );
});

test('getPost selector', t => {
  t.deepEqual(
    getPost({
      posts: { data: [{ cuid: '123' }] },
    }, '123'),
    { cuid: '123' }
  );
});

test('getPostComments selector', t => {
  t.deepEqual(
    getPostComments({
      posts: { comments: ['foo'] },
    }),
    ['foo']
  );
});

test('getGui selector', t => {
  t.deepEqual(
    getGui({
      posts: { gui: { isLoadingComment: true } },
    }),
    { isLoadingComment: true }
  );
});
