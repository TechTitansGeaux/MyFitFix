
const path = require('path');
const express = require('express');
const {User} = require('./db');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//TODO:
app.use(express.static());







const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

//TODO:
app.get('/', (req, res) => {
  res.render('');
});


app.get ('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {

});



app.post('/login', async (req, res) => {
  try {
    // console.log({ verified: verifyGoogleToken(req.body.credential) });
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      DB.push(profile);

      res.status(201).json({
        message: "Signup was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, "myScret", {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const existsInDB = DB.find((person) => person?.email === profile?.email);

      if (!existsInDB) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }

      res.status(201).json({
        message: "Login was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
});



  app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback', (req, res) => {
    passport.authenticate( 'google', {
      
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
})


})

  // const { username, password } = req.body;
  // const { hash } = req.session;

  // return Users.get({ username })
  //   .then((user) => {
  //     if (!user || !Users.compare(password, user.password, user.salt)) {
  //       // user doesn't exist or the password doesn't match
  //       return res.redirect('/login');
  //     }

  //     return Sessions.update({ hash }, { userId: user.id })
  //       .then(() => res.redirect('/'));
  //   })
  //   .catch((error) => {
  //     console.error('Failed to login', error);
  //     res.sendStatus(500);
  //   });
//});