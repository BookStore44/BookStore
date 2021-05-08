import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    categoryname: String,
    lock: {
        type: Boolean,
        default: false,
    }
},
{collection: 'category'});

const module = mongoose.model('category', schema);
export default module;