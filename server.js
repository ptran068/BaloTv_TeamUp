import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import user from './app/routers/user';

import mongoose from 'mongoose';
import config from './app/config/development';

// const db = mongoose.connection;

const PORT = process.env.PORT || 3000;
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect(config.db, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('Some problem with the connection ' + err);
    } else {
        console.log('The Mongoose connection is ready');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(user);

app.use((e, req, res, next) => {
	return res.status(400).json({
		isSuccess: false,
		message: e.message || 'Have error', // Get message from new Error()
		error: e.stack || e
	});
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});
module.exports = app;