'use strict'

const FoodModel = require('../models/food-model'),
    fm = new FoodModel()

class FoodController{
    getFood(req,res){
        let food = {
            foodtype : req.params.foodtype
        }
        fm.getFood(food,function(err,data){
            if(err){
                return res.status(500).send({
                    "message" : err.stack
                })
            }else{
                return res.status(200).send({
                    "foods":data[0]
                })
            }
        })
    }
}

module.exports = FoodController
