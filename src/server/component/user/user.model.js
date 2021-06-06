
import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 30
    },
    password: {
        type: String,
        require: true,
        min: 3,
        max: 30
    },
    email: String,
    role: Number,
    avatar: String,
    lock: {
        type: Boolean,
        default: false,
    }
});

const module = mongoose.model('user', schema);
export default module;