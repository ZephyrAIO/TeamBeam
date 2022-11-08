module.exports = (app, passport) => {
  app.post('/auth/register', passport.authenticate('local-signup'), (req, res) => {
    res.send(req.user.local)
  });

  app.post('/auth/login', passport.authenticate('local-login'), (req, res) => {
    res.send(req.user.local)
  });


  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/surveys')
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {

    let currentUser = undefined
    if (req.user !== undefined) {
      if (req.user.local.email) {
        currentUser = req.user.local
      } else if (req.user.google.id) {
        currentUser = req.user.google
      }
    }

    res.send(currentUser);
  });
};