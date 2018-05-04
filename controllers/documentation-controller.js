'use strict'

const path = require('path')

class DocumentationController{
    getDocumentation(req,res,next){
        res.sendFile(path.resolve('public/documentation.html'))
    }
}

module.exports = DocumentationController