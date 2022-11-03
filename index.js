const express = require('express');
const app = express()
const moment = require('moment')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors');
app.use(cors({
	origin: 'https://miniproject-beige.vercel.app',
}))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	auth: {
		user: process.env.SMTP_EMAIL,
		pass: process.env.SMTP_PASSWORD
	}
}));

app.get('/', (req, res) => {
	res.send('hello world')
})

app.post('/send', (req, res) => {
	var mailOptions = {
		from: process.env.SMTP_EMAIL,
		to: req.body.email,
		subject: 'Message Recieved',
		text: `${req.body.name} has shared a query of ${req.body.message}`,
		html: ""
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			res.json(error)
		} else {
			res.send('Email sent: ' + info.response);
		}
	});
})



app.listen('3001', () => {
	console.log('White-Stripe Backend started on port 3001')
})