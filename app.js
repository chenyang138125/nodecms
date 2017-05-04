var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStrore = require('connect-redis')(session);
var config = require('./config/config');
var bodyParser = require('body-parser');
var api=require('./routes/api');
var views=require('./routes/views');
var admin=require('./routes/admin');
var intercept =require('./core/Intercept');
var app = express();
var modules=require('./modules');
var encryption=require('./core/encryption');
var pjaxEjs=require('./core/pjaxEjs');
var ueditor=require('./ueditor');
var init=require('./core/init');

//设置跨域访问
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With");
    next();
});

init.init();
pjaxEjs(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('72D86ECF-0EB2-5968-4B03-B4B656B271E6'));

app.use(session({
    store:new RedisStrore({
      host:config.redis.host,
      port:config.redis.port
  }),
    secret:"72D86ECF-0EB2-5968-4B03-B4B656B271E6",
    resave:false,
    saveUninitialized:true
}));


// app.use(require('less-middleware')(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'vueadmin')));
//
// app.use('/', views);
// app.use('/admin',intercept.role,admin);

app.use('/v1',api);
// ueditor(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
