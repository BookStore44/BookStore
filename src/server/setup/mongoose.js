//export ra indexx
import mongoose from 'mongoose';

async function connectDB() {
    await mongoose.connect('mongodb://localhost:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('mongoose connected');

    mongoose.connection.on('connected', function(){
        console.log('Mongoose connection success');
    });

    mongoose.connection.on('error', err => {
        console.error(err);
    });
}

const module = connectDB();
export default module;