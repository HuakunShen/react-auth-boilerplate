import { Document, model, Model, Schema } from 'mongoose';
const bcrypt = require('bcrypt');
const validator = require('validator');
import { IUser } from '../interfaces/mongoose';

const UserSchema: Schema = new Schema({
  name: { type: String },
  username: { type: String, required: true, unique: true, minlength: 4 },
  password: { type: String, required: true, minlength: 4 },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Not Valid Email',
    },
  },
});

UserSchema.methods.comparePassword = function (
  candidatePassword: string,
  cb: any
) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    (err: any, isMatch: boolean) => {
      if (err) return cb(err);
      cb(null, isMatch);
    }
  );
};

UserSchema.pre('save', function (next) {
  console.log('\n\n-----pre save for user called-----\n\n');
  const user: any = this;
  if (user.isModified('password')) {
    console.log('password modified, hashing new password');
    bcrypt.genSalt(10, (err: any, salt: number) => {
      bcrypt.hash(user.password, salt, (err: any, hash: string) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findByUsernamePassword = function (
  username: string,
  password: string
): Promise<string | IUser> {
  const User = this; // binds this to the User model
  return User.findOne({ username }).then((user: IUser) => {
    if (!user) {
      return Promise.reject("User doesn't exist"); // a rejected promise
    }
    // if the user exists, make sure their password is correct
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err: any, result: any) => {
        if (result) {
          resolve(user);
        } else {
          reject('Password Incorrect');
        }
      });
    });
  });
};

interface IUserModel extends Model<IUser> {
  findByUsernamePassword: (
    username: string,
    password: string
  ) => Promise<IUser>;
}

export default model<IUser, IUserModel>('User', UserSchema);
