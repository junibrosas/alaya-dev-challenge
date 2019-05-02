import { PostModel } from '../models/post.model';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import { CommentModel } from '../models/comment.model';
import { getErrorMessage } from '../util/errorHandler';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  PostModel.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }

    return res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    return res.status(403).end();
  }

  const newPost = new PostModel(req.body.post);

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
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  PostModel.findOne({ cuid: req.params.cuid })
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
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  PostModel.findOne({ cuid: req.params.cuid }).exec((err, post) => {
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
 * Create like & push like to post
 */
export const likePost = (req, res) => {
  PostModel.findOneAndUpdate({ cuid: req.body.postId }, { $push: { likes: req.body.userId } }, { new: true })
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }

    return res.json({ result });
  });
};

/**
 * Remove like & pull like from post
 */
export const unlikePost = (req, res) => {
  PostModel.findOneAndUpdate({ cuid: req.body.postId }, { $pull: { likes: req.body.userId } }, { new: true })
  .exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }

    return res.json({ result });
  });
};
