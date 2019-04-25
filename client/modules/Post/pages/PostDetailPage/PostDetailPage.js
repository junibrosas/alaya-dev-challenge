import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import styles from '../../components/PostListItem/PostListItem.css';
import { fetchPost, addCommentRequest, fetchPostComments, likePost } from '../../PostActions';
import { getPost, getPostComments } from '../../PostReducer';

import CommentForm from '../../components/CommentForm/CommentForm';
import CommentList from '../../components/CommentList/CommentList';
import LikeButton from '../../components/LikeButton/LikeButton';

export class PostDetailPage extends React.Component {

  componentDidMount() {
    const { post, dispatch } = this.props;

    if (post) {
      dispatch(fetchPostComments(post.cuid));
    }
  }

  handleCommentSubmit = (comment) => {
    const { post, dispatch } = this.props;

    dispatch(addCommentRequest({
      ...comment,
      postId: post.cuid,
    }));

    dispatch(fetchPostComments(post.cuid));
  }

  handleLike = () => {
    const { post, dispatch } = this.props;

    dispatch(likePost(post.cuid));
  }

  render() {
    const { post, comments } = this.props;

    return (
      <div>
        <Helmet title={post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {post.name}</p>
          <p className={styles['post-desc']}>{post.content}</p>

          <LikeButton
            likes={post.likes.length}
            onLiked={this.handleLike}
          />

          {comments && comments.length > 0 &&
            <CommentList comments={comments} />
          }

          <div id="comment">
            <CommentForm onSubmit={this.handleCommentSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [(params) => { return fetchPost(params.cuid); }];


function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
    comments: getPostComments(state),
  };
}

PostDetailPage.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  })),
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
  }).isRequired,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(PostDetailPage);
