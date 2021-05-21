import mongoose from 'mongoose';
const schema = new mongoose.Schema
    ({
        orderId: { type: mongoose.Types.ObjectId, ref: 'order' },
    },
        { collection: 'notify' }, {timestamps: true});

const module = mongoose.model('notify', schema);
export default module;