import express, { Application, Request, Response, NextFunction } from 'express';
import { Document, model, Model, Schema } from 'mongoose';
const router = express.Router();
import { IUser } from '../interfaces/mongoose';
import User from '../models/User';
import { isAuthenticated } from '../middlewares/auth';
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
type SessionRequest = Request & {
  session: Express.Session;
};
// register
router.post('/', (req: Request, res: Response) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) return res.status(400).json({ message: 'User already exists' });
    User.create(req.body)
      .then((user) => {
        console.log(user);
        req!.session!.user = user._id;
        res.status(200).send('Registered ' + user.username);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });
});

//login
router.post('/login', (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  // User.findOne({username}).then()
  User.findByUsernamePassword(username, password)
    .then((user: IUser) => {
      if (!user) {
        console.log('User not found');
        res.status(404).send('User not found');
      } else {
        req!.session!.user = user._id;
        res.status(200).send('Logged in as ' + user.username);
      }
    })
    .catch((error: any) => {
      console.log(error);
      res.status(400).send(error);
    });
});

router.get('/test-session', isAuthenticated, (req: Request, res: Response) => {
  res.send(req.session);
});

module.exports = router;
