import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 1,
        max: 30
    },
    lock: {
        type: Boolean,
        default: false,
    }
});

const module = mongoose.model('category', schema);
export default module;