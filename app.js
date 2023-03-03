const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.use('/user', require('./routes/user'));
app.use('/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
}
);

connectDB();