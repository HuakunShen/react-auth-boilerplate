const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middlewares/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// register
router.post('/', (req, res) => {
  console.log(req.body);
  User.findOne({ username: req.body.username }).then(user => {
    if (user) return res.status(400).json({ message: 'User already exists' });
  });
  User.create(req.body)
    .then(user => {
      console.log(user);
      req.session.user = user._id;
      res.status(200).send('Registered ' + user.username);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

//login
router.post('/login', (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  User.findByEmailPassword(username, password)
    .then(user => {
      if (!user) {
        console.log('User not found');
        res.status(404).send('User not found');
      } else {
        req.session.user = user._id;
        res.status(200).send('logged in ' + user.username);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ error });
    });
});

router.get('/test-session', isAuthenticated, (req, res) => {
  console.log(req.session);
  res.send(req.session);
});

module.exports = router;
