const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new Schema({
  name: String,
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

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.pre('save', function(next) {
  console.log('\n\n-----pre save for user called-----\n\n');
  const user = this;
  if (user.isModified('password')) {
    console.log('password modified, hashing new password');
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);
