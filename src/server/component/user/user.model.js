// config model
import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    username: String,
    password: String,
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