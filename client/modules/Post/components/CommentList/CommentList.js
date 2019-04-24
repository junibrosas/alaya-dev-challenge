import React from 'react';
import PropTypes from 'prop-types';

import styles from './CommentList.css';
import CommentItem from '../CommentItem/CommentItem';

export function CommentList(props) {
  return (
    <div className={styles.list}>
      {props.comments.map((comment, index) => <CommentItem key={index} comment={comment} />)}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  })),
};

export default CommentList;
