const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.end('not logged in');
  }
};
module.exports = { isAuthenticated };
