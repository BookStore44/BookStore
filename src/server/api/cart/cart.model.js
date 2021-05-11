import mongoose from 'mongoose';
const schema = new mongoose.Schema
    ({
        userId: { type: mongoose.Types.ObjectId, ref: 'user' },
        product: [{
            _id: { type: mongoose.Types.ObjectId, ref: 'product' },
            amount : { type: Number, defaut: 1 }
        }]
    },
        { collection: 'cart' });

const module = mongoose.model('cart', schema);
export default module;