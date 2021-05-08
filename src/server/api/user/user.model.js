// config model
import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    username: String,
    password: String,
    role: Number,
    avatar: String,
    lock: {
        type: Boolean,
        default: false,
    }
},
    { collection: 'user' });

const module = mongoose.model('user', schema);
export default module;