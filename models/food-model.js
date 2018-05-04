'use strict'
const conn = require('../models/model')
class FoodModel{
    getFood(food,cb){
        conn.query('CALL sp_get_food(?)',[food.foodtype],cb)
    }
}

module.exports = FoodModel