var express = require("express");
var app = express();
require('dotenv').config()
var expressLayouts = require('express-ejs-layouts');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

const mongoose = require('mongoose');

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true});

var homeRouter = require('./route/home.route')
var adminRouter = require('./admin/route/admin.route')
//cau hinh ejs
app.set('view engine', 'ejs');
app.set('views', './views'); 
app.use("/public", express.static("./public"))
app.use(expressLayouts)
app.use(cookieParser())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//router
app.use('/', homeRouter)
app.use('/admin', adminRouter)

let port = process.env.PORT||3000;
app.listen(port, () => {
	console.log("this server is listening on port " + port);
})



 
