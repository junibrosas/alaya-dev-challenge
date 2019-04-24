import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import postCreateStyle from '../PostCreateWidget/PostCreateWidget.css';
import commentFormStyle from './CommentForm.css';

export class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: this.getDefaultComment(),
    };
  }

  getDefaultComment = () => {
    return {
      author: '',
      content: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const changes = { [name]: value };

    this.setState({
      comment: { ...this.state.comment, ...changes },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      comment: this.getDefaultComment(),
    });
    this.props.onSubmit(this.state.comment);
  }

  render() {
    const { author, content } = this.state.comment;
    const styles = { ...commentFormStyle, ...postCreateStyle };
    const cls = `${styles.form} ${styles.appear} ${styles['comment-form']}`;

    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <input
            placeholder={this.props.intl.messages.authorName}
            className={styles['form-field']}
            name="author"
            value={author}
            onChange={this.handleChange}
          />
          <textarea
            placeholder={this.props.intl.messages.commentMessage}
            className={`${styles['form-field']} ${styles['comment-textarea']}`}
            name="content"
            value={content}
            onChange={this.handleChange}
          />
          <a
            className={styles['post-submit-button']}
            href="#"
            onClick={this.handleSubmit}
          >
            <FormattedMessage id="commentSubmit" />
          </a>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CommentForm);
