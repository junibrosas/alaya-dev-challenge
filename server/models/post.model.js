import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  cuid: { type: 'String', required: true },
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  likes: [
    { type: 'String', required: true },
  ],
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export const Post = mongoose.model('Post', postSchema);

export default mongoose.model('Post', postSchema);
