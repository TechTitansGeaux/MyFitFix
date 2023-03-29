const router = require('express').Router();
const passport = require('passport');

// //Auth login
// router.get('/login', (req, res) => {
//   res.render('login', { user: req.user });
// });

// //Auth logout
// router.get('/logout', (req, res) => {
//   //handle with passport
//   req.logout();
//   res.redirect('/');
// })

// router.get('/home', (req, res) => {
//   res.send('home');
// })

router.get('/home', (req, res) => {
  res.render('/home');
})

//Auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

//Callback route for google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/home');
 
  // Sending current user's Google ID back to any component 
  //Additional comments: for some reason, it will not let me send back the googleId property by itself, so I have to send back the entire user object
  res.send(res.user); 
});





module.exports = router;
