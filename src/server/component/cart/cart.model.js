import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'user' },
    products: [{
        productId: { 
            type: mongoose.Types.ObjectId, 
            ref: 'product' 
        },
        amount: { type: Number, 
            require: 1, 
            default: 1 
        },
    }],
    total: { type: Number, require: 1, default: 1 },
});
const module = mongoose.model('cart', schema);
export default module;