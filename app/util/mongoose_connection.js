const mongoose = require('mongoose');
// turn on debug mode, turn it off for production build
// mongoose.set("debug", true);

// MONGODB_LOCAL_URL=mongodb://localhost/db_name

mongoose
  .connect(process.env.MONGODB_LOCAL_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log('\n\n--------------------\nMongoose connected to DB\n--------------------\n\n');
    },
    err => {
      console.log('Mongoose connection Error: ', err);
    },
  );
