'use strict'

const UserModel = require('../models/user-model'),
    um = new UserModel(),
    jwtService = require('../services/jwt'),
    jwt = new jwtService(),
    bcrypt = require('bcrypt')

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
                        return res.status(200).send({
                            token: jwt.createToken(user),
                            user:{
                                userFirstName:data[0][0].userFirstName,
                                userLastName:data[0][0].userLastName,
                                userPhone:data[0][0].userPhone,
                                userEmail:data[0][0].userEmail
                            }
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

module.exports = UserController