import cuid from 'cuid';
import { LikeModel } from '../models/like.model';
import { PostModel } from '../models/post.model';
import { getErrorMessage } from '../util/errorHandler';

/**
 * Create like & push like to post
 */
export function likePost(req, res) {
  const { postId } = req.body;
  const userId = req.cookies.userId;

  if (!postId) {
    return res.status(400).json({
      error: 'Post not found.',
    });
  }

  LikeModel.findOne({ userId, postId }).exec((likeErr) => {
    if (likeErr) {
      return res.status(400).json({
        error: getErrorMessage(likeErr),
      });
    }

    LikeModel.create({
      cuid: cuid(),
      userId,
      postId,
    }, (err, newLike) => {
      if (err) {
        return res.status(400).json({
          error: getErrorMessage(err),
        });
      }

      PostModel.findOneAndUpdate({ cuid: postId }, { $push: { likes: newLike._id } }, { new: true }, (postErr, post) => {
        if (postErr) {
          return res.status(400).json({
            error: getErrorMessage(postErr),
          });
        }

        return res.json({ result: post });
      });

      return res;
    });

    return res;
  });

  return res;
}


/**
 * Remove like & pull like from post
 */
export function unlikePost(req, res) {
  const { postId } = req.body;
  const userId = req.cookies.userId;

  if (!postId) {
    return res.status(400).json({
      error: 'Post not found.',
    });
  }

  LikeModel.findOne({ userId, postId }).exec((likeErr, like) => {
    if (likeErr) {
      return res.status(400).json({
        error: getErrorMessage(likeErr),
      });
    }

    LikeModel.findByIdAndRemove(like._id, (err) => {
      if (err) {
        return res.status(400).json({
          error: getErrorMessage(err),
        });
      }

      PostModel.findOneAndUpdate({ cuid: postId }, { $pull: { likes: like._id } }, { new: true }, (postErr, post) => {
        if (postErr) {
          return res.status(400).json({
            error: getErrorMessage(postErr),
          });
        }

        return res.json({ result: post });
      });

      return res;
    });

    return res;
  });

  return res;
}

