const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../lib/passport');

const userController = require('./controllers/userController');
const userValidation = require('./utils/userValidation');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Register working before controller
// router.post('/register', (req, res, next) => {
//   User.findOne({ email: req.body.email }).then(user => {
//     if (user) return res.send('User Exists');
//     else {
//       const newUser = new User();

//       newUser.profile.name = req.body.name;
//       newUser.email = req.body.email;
//       newUser.password = req.body.password;

//       newUser
//         .save()
//         .then(user => {
//           if (user) {
//             res.status(200).json({ message: 'success', user });
//           }
//         })
//         .catch(err => {
//           return next(err);
//         });
//     }
//   });
// });
router.get('/register', (req, res) => {
  return res.render('auth/register', {errors: req.flash('errors')});
});

router.post('/register', userValidation, userController.register);

router.get('/update-profile', (req, res) => {
  return res.render('auth/update-profile')
})

// router.get('/login', (req, res) => {
//   if(req.isAuthenticated()) {
//     return res.direct('/');
//   }
//   return res.redirect('/api/users/login');
// })

router.get('/login', (req,res)=>{
  return res.render('auth/login', {errors: req.flash('errors')})
})

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/api/users/login',
  failureFlash: true
}));

router.get('/profile', (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.render('auth/profile')
  } else {
    return res.send('Unauthorised');
  }
});

module.exports = router;
