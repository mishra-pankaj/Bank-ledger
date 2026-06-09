require("dotenv").config();
const authRoutes = require('./routes/auth.routes');
const express = require('express');
const cookieParser = require('cookie-parser');

const connectDb = require('./config/db');
console.log(process.env.MongoDB_URI);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
connectDb()
module.exports = app;
