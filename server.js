'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Set up Pug template engine and views directory
app.set('view engine', 'pug');
app.set('views', './views/pug');

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Initialize Passport and use session
app.use(passport.initialize());
app.use(passport.session());

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/').get((req, res) => {
  // Render the index.pug template
  res.render('index');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
