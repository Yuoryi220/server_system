var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwtAuth=require('../utils/auth');

//连接数据库-start
const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/data'
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('connected', () => console.log(dbURL + ' 数据库连接成功'));
//连接数据库-end

var imagesRouter=require('./routes/images');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var siteconfigRouter= require('./routes/siteconfig');
var pagesRouter = require('./routes/pages');
var newsRouter = require('./routes/news');
var catesRouter = require('./routes/cates');
var bannerRouter = require('./routes/banner');
var frendlinkRouter = require('./routes/frendlink');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwtAuth);
app.use('/images',imagesRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/siteconfig', siteconfigRouter);
app.use('/pages', pagesRouter);
app.use('/news', newsRouter);
app.use('/cates', catesRouter);
app.use('/banner', bannerRouter);
app.use('/frendlink', frendlinkRouter);

var allowCrossDomain = function (req, res, next) {
    // 允许哪一个域可以访问
    res.header("Access-Control-Allow-Origin", "*");
    // 允许跨域访问的请求头
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept,Authorization");
    // 允许跨域访问的请求类型
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");
    // 允许cookie发送到服务器
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}
app.use(allowCrossDomain);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// module.exports = app;
app.listen(8000,()=>{console.log('8000端口服务器已经启动')});