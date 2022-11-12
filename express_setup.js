const express = require('express');
const ErrorHandler = require('./Modules/Error/error-handler');
const index = require('./src/routes/IndexRoute')
const user = require('./src/routes/UserRoute');
const app = express()

app.use(express.json({ limit: '1mb'}));
app.use(express.urlencoded({ extended: true, limit: '1mb'}));


// routes
app.use("/",index)
app.use("/user",user)


app.use(ErrorHandler)

exports.express_app = app