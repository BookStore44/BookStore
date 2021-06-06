import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 1,
        max: 30
    },
    price: { 
        type: Number, 
        default: 0 
    },
    image: Array,
    category: { 
        type: mongoose.Types.ObjectId, 
        ref: 'category' 
    },
    lock: { 
        type: Boolean,
        default: false }
});

const module = mongoose.model('product', schema);
export default module;