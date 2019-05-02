import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import { CommentModel } from '../models/comment.model';
import { getErrorMessage } from '../util/errorHandler';

/**
 * Get all comments by post
 * @param {*} req
 * @param {*} res
 * @returns void
 */
export function getPostComments(req, res) {
  CommentModel.find({ postId: req.params.postId }).sort('dateAdded').exec((err, comments) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }

    return res.json({ comments });
  });
}

// Create new comment
export function addComment(req, res) {
  if (!req.body.comment.postId || !req.body.comment.author || !req.body.comment.content) {
    return res.status(400).json({
      error: 'Required fields: postId, author, content',
    });
  }

  const comment = new CommentModel(req.body.comment);
  comment.author = sanitizeHtml(comment.author);
  comment.content = sanitizeHtml(comment.content);
  comment.cuid = cuid();
  comment.save((err, saved) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }

    return res.json({ comment: saved });
  });

  return res;
}

