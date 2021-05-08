import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    productname: String,
    price: { Number, default: 0 },
    sold: { Number, default: 0 },
    avatar: String,
    category: { type: mongoose.Types.ObjectId, ref: 'category' },
    lock: { type: Boolean, default: false }
},
    { collection: 'product' });

const module = mongoose.model('product', schema);
export default module;