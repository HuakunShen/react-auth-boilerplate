const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const session = require('express-session');
const time = require('./util/time');

require('dotenv').config();
const PORT = process.env.PORT || 5000;
/*** Session handling **************************************/
// Create a session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 30 * time.one_day,
      httpOnly: true,
    },
  })
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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}\n\n`);
});
