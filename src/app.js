require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const connectDb = require('./config/db');
console.log(process.env.MongoDB_URI);

/**
 * -Routes required
 */
const authRoutes = require('./routes/auth.routes');
const accountRoutes = require('./routes/account.routes');


app.use(express.json());
app.use(cookieParser());

/**
 * -Use Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);

connectDb()
module.exports = app;
