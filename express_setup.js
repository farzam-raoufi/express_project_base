const express = require('express')
const index = require('./src/routes/IndexRoute')

const app = express()

app.use("/",index)

exports.express_app = app