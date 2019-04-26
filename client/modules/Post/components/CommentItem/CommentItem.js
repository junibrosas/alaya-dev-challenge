import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './CommentItem.css';

export function CommentItem(props) {
  const { author, content, dateAdded } = props.comment;
  const date = moment(dateAdded).fromNow();

  return (
    <div className={styles.item}>
      <p><span className={styles.author}>{author}</span> commented {date}</p>
      <div>{content}</div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  }),
};
