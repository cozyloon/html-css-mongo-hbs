const mongoose = require('mongoose');

mongoose
	.connect('mongodb://127.0.0.1:27017/employee', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log(`connection success`);
	})
	.catch((e) => {
		console.log(`no connection`);
	});
