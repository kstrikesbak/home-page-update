var express = require('express');
const data = require('../views/main/home');
var router = express.Router();


// Render Home Page
router.get('/', (req, res, next) => {
  console.log(data)
  return res.render('main/home', {data});
});

router.get('/logout', (req, res) => {
  req.logout();
  return res.redirect('/');
})

module.exports = router;
