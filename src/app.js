const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

require('./db/conn');
const Register = require('./models/register');
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, '../public');
const img_path = path.join(__dirname, '../asserts');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.use(express.static(img_path));

app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/register', async (req, res) => {
	try {
		const pass = req.body.password;
		const cpass = req.body.confirmPassword;
		if (pass == cpass) {
			const registerEmployee = new Register({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: pass,
				confirmPassword: cpass,
			});

			const registered = await registerEmployee.save();
			res.status(201).render('index');
		} else {
			res.send('password not match');
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

app.post('/login', async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;

		const userEmail = await Register.findOne({ email: email });

		if (userEmail.password == password) {
			res.status(201).render('index');
		} else {
			res.send('Invalid login details');
		}
	} catch (error) {
		res.status(400).send('Invalid login details');
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
