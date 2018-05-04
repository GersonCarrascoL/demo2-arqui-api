'use strict'

const DocumentationController = require('../controllers/documentation-controller'),
    dc = new DocumentationController(),
    express = require('express'),
    router = express.Router()

router
    .get('/api/v1/documentation',dc.getDocumentation)

module.exports = router