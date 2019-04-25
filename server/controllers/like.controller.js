import cuid from 'cuid';
import { LikeModel } from '../models/like.model';
import { PostModel } from '../models/post.model';


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
    res.status(403).end();
  }

  LikeModel.findOne({ userId, postId }).exec((likeErr, like) => {
    if (likeErr) { res.status(500).send(likeErr); }

    if (like) {
      LikeModel.findByIdAndRemove(like._id, (err) => {
        if (err) { res.status(500).send(err); }

        PostModel.findOneAndUpdate({ cuid: postId }, { $pull: { likes: like._id } }, { new: true }, (postErr, post) => {
          if (postErr) { res.status(500).send(postErr); }
          res.json({ status: 'done', result: post });
        });
      });
    } else {
      LikeModel.create({
        cuid: cuid(),
        userId,
        postId,
      }, (err, newLike) => {
        if (err) { res.send(err); }

        PostModel.findOneAndUpdate({ cuid: postId }, { $push: { likes: newLike._id } }, { new: true }, (postErr, post) => {
          if (postErr) { res.status(500).send(postErr); }
          res.json({ status: 'done', result: post });
        });
      });
    }
  });
}

