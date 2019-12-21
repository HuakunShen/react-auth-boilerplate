const express = require('express');
const router = express.Router();
const User = require('../models/User');

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
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

//login
router.post('/login', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
