import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import { CommentModel } from '../models/comment.model';

export function getPostComments(req, res) {
  CommentModel.find({ postId: req.params.postId }).sort('dateAdded').exec((err, comments) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comments });
  });
}

export function addComment(req, res) {
  if (!req.body.comment.postId || !req.body.comment.author || !req.body.comment.content) {
    res.status(403).end();
  }

  const comment = new CommentModel(req.body.comment);

  comment.author = sanitizeHtml(comment.author);
  comment.content = sanitizeHtml(comment.content);
  comment.cuid = cuid();
  comment.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comment: saved });
  });
}
