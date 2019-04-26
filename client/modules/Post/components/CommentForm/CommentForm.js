import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import postCreateStyle from '../PostCreateWidget/PostCreateWidget.css';
import commentFormStyle from './CommentForm.css';
export class CommentFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = this.getDefaultState();
  }

  getDefaultState = () => {
    return {
      comment: {
        author: '',
        content: '',
      },
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

    const { author, content } = this.state.comment;

    if (!author && !content) return;

    this.props.onSubmit(this.state.comment);
    this.setState(this.getDefaultState());
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
          <button
            type="submit"
            className={styles['post-submit-button']}
            onClick={this.handleSubmit}
          >
            <FormattedMessage id="commentSubmit" />
          </button>
        </div>
      </div>
    );
  }
}

CommentFormComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  intl: intlShape,
};

export const CommentForm = injectIntl(CommentFormComponent);
