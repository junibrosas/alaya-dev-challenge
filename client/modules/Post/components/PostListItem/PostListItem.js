import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostListItem.css';
import ReactMarkdown from 'react-markdown';

function PostListItem(props) {
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/posts/${props.post.slug}-${props.post.cuid}`} >
          {props.post.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
      <span className={styles['post-desc']}><ReactMarkdown source={props.post.content} /></span>
      <span className={styles['post-action']}>
        <ul>
          <li><a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a></li>
          <li>
            <Link to={`/posts/${props.post.slug}-${props.post.cuid}#comment`} >
              <FormattedMessage id="commentPost" />
            </Link>
          </li>
        </ul>
      </span>
      <hr className={styles.divider} />
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
