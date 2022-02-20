const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

//initialization
require('./config/config');

//settings
dotenv.config();

//Database
require('./database');

//middlewares
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors())
//routes
app.use(require('./controllers/API/routes/user'));
app.use(require('./routes/login.routes'));
app.use(require('./routes/poll.routes'));

//exports Test
module.exports = app;