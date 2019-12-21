const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const session = require('express-session');
const User = require('./models/User');
require('dotenv').config();
/*** Session handling **************************************/
// Create a session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 6000,
      httpOnly: true,
    },
  }),
);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

require('./util/mongoose_connection');

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/*', (req, res) => {
  res.status(404).end('Not Found');
});

module.exports = app;
