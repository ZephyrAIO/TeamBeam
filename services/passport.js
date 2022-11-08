const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')

module.exports = function (passport) {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  // Refactor to arrow func
  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  })


  passport.use('local-signup',
    new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
      function (req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function () {

          // find a user whose email is the same as the forms email
          // we are checking to see if the user trying to login already exists
          User.findOne({ 'local.email': email }, function (err, user) {
            // if there are any errors, return the error
            if (err) {
              console.log("ERROR");
              return done(err);
            }
              

            // check to see if theres already a user with that email
            if (user) {
              console.log("USER EXISTS");
              return done(null, false, 'That email is already taken.'); //HANDLE FLASH MSG ", req.flash('signupMessage', 'That email is already taken.')"
            } else {
              console.log("CREATE USER");
              // if there is no user with that email
              // create the user
              let newUser = new User();

              // set the user's local credentials
              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);

              // save the user
              newUser.save(function (err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }

          });

        });

      }
    )
  )

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    function (req, email, password, done) { // callback with email and password from our form
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'local.email': email }, function (err, user) {
        // if there are any errors, return the error before anything else
        if (err) {
          return done(err);
        }

        // if no user is found, return the message
        if (!user) {
          return done(null, false); // req.flash is the way to set flashdata using connect-flash
        }

        // if the user is found but the password is wrong
        if (!user.validPassword(password)) {
          return done(null, false); // create the loginMessage and save it to session as flashdata
        }

        // all is well, return successful user
        return done(null, user);
      });

    }));

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ 'google.id': profile.id })

      if (existingUser) {
        return done(null, existingUser)
      }

      const user = await new User({
        google: {
          id: profile.id,
          email: profile._json.email
        }
      }).save()

      done(null, user)
    }
  )
  )
}