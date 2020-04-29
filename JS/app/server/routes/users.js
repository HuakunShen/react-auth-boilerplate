const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middlewares/auth');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// register
router.post('/', (req, res) => {
  console.log(req.body);
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) return res.status(400).json({ message: 'User already exists' });
  });
  User.create(req.body)
    .then((user) => {
      console.log(user);
      req.session.user = user._id;
      res.status(200).send('Registered ' + user.username);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

//login
router.post('/login', (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  User.findByEmailPassword(username, password)
    .then((user) => {
      if (!user) {
        console.log('User not found');
        res.status(404).send('User not found');
      } else {
        req.session.user = user._id;
        res.status(200).send('logged in ' + user.username);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
});

// logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('logout failed');
    }
    res.send('logged out');
  });
});

router.get('/test-session', isAuthenticated, (req, res) => {
  console.log(req.session);
  res.send(req.session);
});

router.get('/load-auth', isAuthenticated, (req, res) => {
  // console.log(req.params);
  User.findById(req.session.user)
    .select('-password -__v')
    .then((user) => {
      if (!user) {
        console.log('something went wrong');
        return res.send('something went wrong');
      }
      // if (user.username == req.params.username) {
      // console.log(user);
      return res.send(user);
      // }
    });
});

module.exports = router;
