require('dotenv').config();

const path = require('path')

const express = require('express');
const app = express();

const morgan          = require('morgan');
const mongoose        = require('mongoose');
const session         = require('express-session');
const MongoStore      = require('connect-mongo');
const passport        = require('passport');


// App Config
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
});


// Auth Config
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  touchAfter: 24 * 60 * 60,
  crypto: {
      secret: process.env.SECRET
    }
})

store.on("error", function(e) {
  console.log("SESSION STORE ERROR:", e);
})

const sessionConfig = {
  store,
  name: 'teambeam',
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly: true,
      // secure: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfig))
app.use(passport.initialize());
app.use(passport.session());
require('./services/passport')(passport)



// routes 
require('./routes/auth')(app, passport)


// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Initialize server
const PORT = process.env.PORT || 5000;
app.listen(PORT);