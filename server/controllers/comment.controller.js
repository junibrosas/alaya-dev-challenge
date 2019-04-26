import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import { CommentModel } from '../models/comment.model';

/**
 * Get all comments by post
 * @param {*} req
 * @param {*} res
 * @returns void
 */
export function getPostComments(req, res) {
  CommentModel.find({ postId: req.params.postId }).sort('dateAdded').exec((err, comments) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ comments });
    }
  });
}

/**
 * Create new comment
 * @param {*} req
 * @param {*} res
 */
export function addComment(req, res) {
  if (!req.body.comment.postId || !req.body.comment.author || !req.body.comment.content) {
    res.status(403).json({ status: 'error', result: 'Required fields: postId, author, content' });
  } else {
    const comment = new CommentModel(req.body.comment);
    comment.author = sanitizeHtml(comment.author);
    comment.content = sanitizeHtml(comment.content);
    comment.cuid = cuid();
    comment.save((err, saved) => {
      if (err) {
        res.status(500).json(err);
      }
      res.json({ comment: saved });
    });
  }
}

