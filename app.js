var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var helmet = require('helmet')
const csrf = require('csurf');

var tools = require('./modules/tools')
var db = require('./models/index');

var indexRouter = require('./routes/index');
var topRouter = require('./routes/top');
var companyRouter = require('./routes/company');

// API
var companyApi = require('./api/v1/company');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(helmet({
  contentSecurityPolicy: false,
})
);

var secure = {};
if (process.env.NODE_ENV == 'procuction') {
  secure = {
    secure: true,
    httpOnly: true,
    domain: 'jobchange.herokuapp.com',
  }
}

// sessionの設定
var session_opt = {
  secret: 'seccone',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
    secure
  }
};
app.use(session(session_opt));

// passportの設定
app.use(passport.initialize());
app.use(passport.session());

// passportの設定
passport.use(new LocalStrategy(
  async function (username, password, done) {
    
    var user;
    try {
      // DBから認証情報の取得
      user = await db.User.findOne({
        where: { user_name: username }
      });
      
      if (!user || user.password !== tools.hashSha256(password)) {
        return done(null, false, { message: '認証エラー' });
      }
      
      return done(null, user);
    
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(function (user, done) {
  console.log('Serialize ...')
  done(null, user.id);
});

passport.deserializeUser(async function (userid, done) {
  console.log('Deserialize ...')
  done(null, userid);
});

app.use('/', indexRouter);
app.use('/top', topRouter);
app.use('/company', companyRouter);

// API用のルーティング
app.use('/api/v1/company/', companyApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
