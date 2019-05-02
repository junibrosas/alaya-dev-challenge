import { Post } from '../models/post.model';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import { CommentModel } from '../models/comment.model';
import { getErrorMessage } from '../util/errorHandler';

/**
 * GET: Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }

    return res.json({ posts });
  });
}

/**
 * POST: Save a post
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    return res.status(400).json({
      error: 'Required fields: author, title, content',
    });
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();

  newPost.save((err, saved) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }

    return res.json({ post: saved });
  });

  return res;
}

/**
 * GET: Get a single post
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid })
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({
          error: getErrorMessage(err),
        });
      }

      return res.json({ post });
    });
}

/**
 * DELETE: Delete a post
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }

    post.remove(() => {
      CommentModel.find({ postId: post.cuid }).remove().exec((cres) => {
        if (cres) {
          return res.status(400).json({
            error: getErrorMessage(cres),
          });
        }

        return res.status(200).end();
      });
    });

    return res;
  });
}


/**
 * POST: Create like & push like to post
 */
export const likePost = (req, res) => {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    return res.status(400).json({
      error: 'Required fields: postId, userId',
    });
  }

  Post.findOneAndUpdate({ cuid: postId }, { $push: { likes: userId } }, { new: true })
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }

    return res.json({ result });
  });

  return res;
};

/**
 * POST: Remove like & pull like from post
 */
export const unlikePost = (req, res) => {
  const { postId, userId } = req.body;

  if (!postId || !userId) {
    return res.status(400).json({
      error: 'Required fields: postId, userId',
    });
  }

  Post.findOneAndUpdate({ cuid: postId }, { $pull: { likes: userId } }, { new: true })
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }

    return res.json({ result });
  });

  return res;
};


/**
 * GET: Get all comments by post
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

/**
 * POST: Create new comment
 */
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
