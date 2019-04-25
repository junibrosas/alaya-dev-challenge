import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  cuid: { type: 'String', required: true },
  postId: { type: 'String', required: true },
  userId: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export const LikeModel = mongoose.model('Like', schema);

export default mongoose.model('Like', schema);
