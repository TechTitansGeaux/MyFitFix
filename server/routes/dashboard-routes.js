const router = require('express').Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user is not logged in
    res.redirect('/auth/login');
  } else {
    // if logged in
    next();
  }
}

router.get('/', authCheck, (req, res) => {
  res.render('/home', { user: req.user });
})


// This will RETRIEVE the specific users name, so it can appear on the dashboard
router.get('/name', (req, res) => {
  const { name, thumbnail } = req.user

  res.send({name: name, thumbnail: thumbnail});
})

module.exports = router;
