import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    name: String,
    price: { type: Number, default: 0 },
    //sold: { Number, default: 0 },
    avatar: Array,
    category: { type: mongoose.Types.ObjectId, ref: 'category' },
    lock: { type: Boolean, default: false }
});

const module = mongoose.model('product', schema);
export default module;