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
// Whitelist Address
const corsWhitelist = ['https://y4j.vibhanshu.in', 'http://localhost:3000'];

app.use(function (req, res, next) {
    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    }
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/user', require('./routes/user'));
app.use('/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
}
);

connectDB();