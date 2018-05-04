'use strict'

const express = require('express'),
    router = express.Router(),
    FoodController = require('../controllers/food-controller'),
    fc = new FoodController()  
router
    .get('/api/v1/foods/:foodtype',fc.getFood)

module.exports = router