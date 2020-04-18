import express, { Application, Request, Response, NextFunction } from 'express';
const app: Application = express();
const createError = require('http-errors');
const path = require('path');
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log(path.join(__dirname, 'public'));

app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use('/static', express.static('public'));

const PORT = process.env.PORT || 5000;
require('dotenv').config();
require('./util/connect_mongodb');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000,
      httpOnly: true,
    },
  })
);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
