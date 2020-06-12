const db = require('./../db/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {};

let item = '';
// verifyUser should check if user exists in database / is valid
userController.verifyUser = (req, res, next) => {
  const { email, password } = req.body;
  item =
    'SELECT u.users_id, u.email FROM users u WHERE email = $1 AND password = $2;';
  const values = [email, password];
  db.query(item, values)
    .then((query) => {
      if (!query.rows.length) {
        return res.status(400).send('Login Failed');
      }
      // make jwt, set in cookie
      const token = jwt.sign(email, process.env.JWT_SECRET);
      res.cookie('jwt', token, { httpOnly: false });
      res.locals.currentUser = query.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: 'ERROR in userControllers.verifyUser',
        message: { err: `ERROR in userControllers.verifyUser ${err}` },
      });
    });
};

userController.validateToken = (req, res, next) => {
  // check incoming cookie and validate token before showing user-specific area
  console.log('Inside validateToken');
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // if decoded exists, jwt verification passed, pass users_id into locals and move onto next middleware
  if (decoded) {
    item = `SELECT users_id FROM users WHERE email = $1;`;
    const values = [decoded];
    db.query(item, values).then((query) => {
      res.locals.users_id = query.rows[0].users_id;
      res.locals.email = decoded;
      console.log('validate token success, moving on');
      return next();
    });
  } else {
    console.log('validate token fail');
    // figure out logic for what to do in front end. WHEN do they need to verify jwt, and what happens if it fails?
    return res.status(400).send('jwt verify failed');
  }
};

module.exports = userController;
