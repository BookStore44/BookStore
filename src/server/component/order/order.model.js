import mongoose from 'mongoose';
const schema = new mongoose.Schema
    ({
        userId: { type: mongoose.Types.ObjectId, ref: 'users' },
        products: [{
            productId: { 
                type: mongoose.Types.ObjectId, 
                ref: 'product' 
            },
            amount: { 
                type: Number,
                require: 1,
                default: 1 },
            price: { 
                type: Number,
                require: 1, 
                default: 0 
            }
        }],
        status: Number,
        // daycreate: Date,
        // dayupdate: Date,
        daydelivery: Date,
        dayfinish: Date,
        address: { type: String }
    });
schema.set('timestamps', true);
const module = mongoose.model('order', schema);
export default module;