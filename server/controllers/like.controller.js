import cuid from 'cuid';
import { LikeModel } from '../models/like.model';
import { PostModel } from '../models/post.model';
import { getErrorMessage } from '../util/errorHandler';

/**
 * Create/Remove a like
 * @param {*} req
 * @param {*} res
 * @returns void
 */
export function postLike(req, res) {
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

    // remove like & pull like from post
    if (like) {
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
    } else {
      // create like & push like to post
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
    }

    return res;
  });

  return res;
}

