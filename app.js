var express = require('express');
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var handle_err = require('./handle_err/handle_err');

var index = require('./routes/index');
var users = require('./routes/users');
var study = require('./routes/study');
var main_page = require('./routes/main_page');

var app = express();

var logDirectory = path.join(__dirname, 'log')


// 处理报错
app.use(handle_err);
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})

console.log('env::::', process.env.NODE_ENV);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// setup the logger
app.use(logger('combined', {stream: accessLogStream}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/', index);
app.use('/users', users);
app.use('/study', study);
app.use('/main_page', main_page);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
// app.use(function (err, req, res, next) {
//     console.log(2222, err);
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     console.log('------', req.app.get('env'));
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     console.log('app.js error handler', err);
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app;
