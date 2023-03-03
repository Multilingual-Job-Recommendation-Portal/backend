const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI = process.env.MONGODB;

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(result => {
            console.log('Connected to Database');
        });
    } catch (error) {
        console.error(`Error: ${error} `);
        process.exit(1);
    }

}

module.exports = connectDB;