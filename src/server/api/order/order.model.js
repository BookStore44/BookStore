import mongoose from 'mongoose';
const schema = new mongoose.Schema
    ({
        userId: { type: mongoose.Types.ObjectId, ref: 'user' },
        products: [{
            productId: { type: mongoose.Types.ObjectId, ref: 'product' },
            amount: { type: Number, require: 1, default: 1 },
            price: { type: Number, require: 1, default: 0 }
        }],
        status: Number,
        // daycreate: Date,
        // dayupdate: Date,
        daydelivery: Date,
        dayfinish: Date,
        adress: { type: String }
    },
        { collection: 'order' });
schema.set('timestamps', true);
const module = mongoose.model('order', schema);
export default module;