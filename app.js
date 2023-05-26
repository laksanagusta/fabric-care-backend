var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require("request");
// const jwt = require('express-jwt');
const session = require('express-session');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
var helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
var request = require("request");
const {authenticateJWT} = require('./middlewares/auth');
var dotenv = require('dotenv')
const { mongoose } = require('./config');

//put, delete lib
const methodOverride = require('method-override');
const flash = require('connect-flash');

dotenv.config()

process.env.TZ = "Asia/Jayapura";
console.log(new Date().toString());

//authentication
// const { auth, requiresAuth  } = require('express-openid-connect');

//import mongoose
mongoose.connect()

var app = express();

//admin
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const transactionRouter = require('./routes/transaction');
const serviceRouter = require('./routes/service');
const spendingRouter = require('./routes/spending');
const branchRouter = require('./routes/branch');
const rackRouter = require('./routes/rack');
const flowRouter = require('./routes/flow');
const taskRouter = require('./routes/task');

//api
const apiAuthRouter = require('./routes/api/auth')
const apiTaskRouter = require('./routes/api/task')
const apiTransactionRouter = require('./routes/api/transaction')
const apiDashboardRouter = require('./routes/api/dashboard')


// adding Helmet to enhance your API's security
// app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { expire: false }
}));
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));

const port = process.env.port || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

app.use('/', indexRouter);
app.use('/user', usersRouter);

//admin
app.use('/admin', adminRouter);
app.use('/transaction', transactionRouter);
app.use('/service', serviceRouter);
app.use('/spending', spendingRouter);
app.use('/branch', branchRouter);
app.use('/rack', rackRouter);
app.use('/flow', flowRouter);
app.use('/task', taskRouter);

//api
app.use('/api/v1/auth', apiAuthRouter)
app.use('/api/v1/task', apiTaskRouter)
app.use('/api/v1/transaction', apiTransactionRouter)
app.use('/api/v1/dashboard', apiDashboardRouter)


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
