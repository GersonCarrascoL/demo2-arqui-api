'use strict'

const conn = require('../models/model')

class UserModel{
    userRegister(user,cb){
        conn.query('CALL sp_post_user(?,?,?,?,?)',[user.userFirstName,user.userLastName,user.userPhone,user.userEmail,user.userPassword],cb)
    }

    userLogin(user,cb){
        conn.query('CALL sp_post_login(?)',[user.userEmail],cb)
    }
}

module.exports = UserModel