'use strict'

const express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    ioServer = require('./services/socket')(app),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    restFul  = require('express-method-override')('_method'),
    routesExample = require('./routes/example-router'),
    routesFood = require('./routes/food-router'),
    routesUser = require('./routes/user-router'),
    routesDocumentation = require('./routes/documentation-router'),
    port = (process.env.PORT || 5000),
    cors = require('cors')

app
    .set('port', port)

    .use(express.static('public'))
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(morgan('dev'))
    .use(restFul)
    .use(routesExample)
    .use(routesFood)
    .use(routesUser)
    .use(routesDocumentation)

ioServer.listen(port)
