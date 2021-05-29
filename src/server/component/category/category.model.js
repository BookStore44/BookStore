import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    name: String,
    lock: {
        type: Boolean,
        default: false,
    }
});

const module = mongoose.model('category', schema);
export default module;