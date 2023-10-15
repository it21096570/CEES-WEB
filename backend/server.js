//create varables and import pacages
const dotenv = require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const googleAuth = require('./google.auth');
const passport = require('passport');
var session = require('express-session');

const { routsInit, initGoogleAuthRoutes } = require('./controllers/auth.controller')
const MongoStore = require('connect-mongo');
const { config } = require("dotenv");

const path = require('path');
const database = require("./config/database");


const authRoutes = require('./routes/auth.routes');
const payementRoutes = require('./routes/payment.routes');



//import .env
require("dotenv").config();

//initialize port number
const PORT = process.env.PORT || 8080;

//use dependancies
app.use(cors());
//get json using bodyparser
app.use(bodyParser.json());

//connect mongo db options
const URI = process.env.MONGODB_URL;


//auth
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false, store: MongoStore.create({ mongoUrl: URI }), cookie: { secure: false, expires: new Date(Date.now() + 50000) }, maxAge: 10000 }));
app.use(passport.initialize());
app.use(passport.session());




//using singleton
database.connect().then(() => {

    //console.log('Connected to MongoDB!!!');

    app.listen(PORT, () => {

        console.log(`Server is up and running on port ${PORT}`);
        initGoogleAuthRoutes(app, passport)
        googleAuth(passport)

    });
}).catch((error) => {
    console.log("Error Connecting MongoDb", error);
});




const db = mongoose.connection;


app.use('/auth', authRoutes);
app.use('/payment', payementRoutes);





