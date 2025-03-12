const express = require('express');
const router  = express.Router();
// user query functions
const userQueries = require('../db/queries/users');
const getUsers = userQueries.getUsers;
const getUserByEmail = userQueries.getUserByEmail;
const checkUserExists = userQueries.checkUserExists;

router.get('/', (req, res) => {
  const templateVars = {
    id: req.session.userId
  };
  res.render('login', templateVars);
}); 

router.post('/', (req, res) => {
  // name is used for verification purposes here since we dont have passwords
  const name = req.body.name;
  const email = req.body.email;
  // TODO: check if it's a match
  if (checkUserExists(name, email)){
    console.log("inside login.js usercheck pass");
    // change this to promise
    getUserByEmail(email)
    .then(user => {
      // set them as logged in, using cookies
      req.session.userId = user.id;
      // set is-admin cookie for ease of development
      req.session.isAdmin = user.is_admin;
    })
    .then(()=> {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;