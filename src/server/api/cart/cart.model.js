import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'user' },
    products: [{
        _id: { type: mongoose.Types.ObjectId, ref: 'product' },
        amount: { type: Number, require: 1, default: 1 },
        //price: { type: Number, require: 1, default: 0 }
    }],
    total: { type: Number, require: 1, default: 1 },
});

// const module = mongoose.model('cart', schema);
const module = mongoose.model('cart', schema);
export default module;