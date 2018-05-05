'use strict'

const UserModel = require('../models/user-model'),
    um = new UserModel(),
    jwtService = require('../services/jwt'),
    jwt = new jwtService(),
    bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    util = require('util')

class UserController{
    userRegister(req,res) {
        let user = {
            userFirstName: req.body.userFirstName,
            userLastName: req.body.userLastName,
            userPhone: req.body.userPhone,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword
        }

        bcrypt.hash(user.userPassword, 10, function (err, hash) {
            user.userPassword = hash
            if (err) {
                return res.status(500).send({
                    message: err.stack
                })
            }
            um.userRegister(user, (err, data ) => {
                if (err) {
                    return res.status(500).send({
                        message: err.stack
                    })
                } else {
                    return res.status(201).send({
                        token: jwt.createToken(user)
                    })
                }
            })
        })
    }

    userLogin(req,res){
        let user = {
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword
        }

        um.userLogin(user, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err.stack
                })
            } else if (data[0].length == 0) {
                return res.status(202).send({
                    message: `No data`
                })
            } else {
                bcrypt.compare(user.userPassword, data[0][0].userPassword, function (err, response) {
                    if (response == true) {
                        let tokenEntryFood = getSASToken('arqui-demo2','entryfood','RootManageSharedAccessKey','j6svY26uyvAGcqhoz/8iQ6gLvPhFFQl5P0Bv4kWrV4Q=');
                        let tokenFood = getSASToken('arqui-demo2','food','RootManageSharedAccessKey','j6svY26uyvAGcqhoz/8iQ6gLvPhFFQl5P0Bv4kWrV4Q=');
                        let tokenDessert = getSASToken('arqui-demo2','dessert','RootManageSharedAccessKey','j6svY26uyvAGcqhoz/8iQ6gLvPhFFQl5P0Bv4kWrV4Q=');
                        let tokenDrink = getSASToken('arqui-demo2','drink','RootManageSharedAccessKey','j6svY26uyvAGcqhoz/8iQ6gLvPhFFQl5P0Bv4kWrV4Q=');
                
                        return res.status(200).send({
                            token: jwt.createToken(user),
                            user:{
                                userFirstName:data[0][0].userFirstName,
                                userLastName:data[0][0].userLastName,
                                userPhone:data[0][0].userPhone,
                                userEmail:data[0][0].userEmail
                            },
                            tokenEntryFood:tokenEntryFood,
                            tokenFood:tokenFood,
                            tokenDessert:tokenDessert,
                            tokenDrink:tokenDrink
                        })
                    } else {
                        return res.status(202).send({
                            message: 'Email or Password wrong'
                        })
                    }
                })
            }
        })
    }
}

function getSASToken(serviceNamespace, entityPath, sasKeyName, sasKey) { 
    var uri = "http://" + serviceNamespace + 
    ".servicebus.windows.net/" + entityPath; 

    var encodedResourceUri = encodeURIComponent(uri); 

    var expireInSeconds = Math.round(minutesFromNow(5)/1000);
  
    var plainSignature = encodedResourceUri + "\n" + expireInSeconds; 
    
    var signature = crypto.createHmac('sha256', sasKey)
                            .update(plainSignature)
                            .digest('base64'); 
    return util.format('SharedAccessSignature sig=%s&se=%s&skn=%s&sr=%s', 
                encodeURIComponent(signature), expireInSeconds, sasKeyName, encodedResourceUri);; 

    function minutesFromNow(minutes) {
          var date = new Date();
          date.setMinutes(date.getMinutes() + minutes);
          return date;
    }
}

module.exports = UserController