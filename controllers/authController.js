const AuthModels = require('../models/users.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET_KEY = 'h3254hgu4123ug';

const AuthHandler = (req, res) => {
    const { username, password } = req.body;
    AuthModels.findOne({
        username
    }).then((result) => {
        if (result) {
            if (password == result.password) {
                const newToken = jwt.sign({
                    username: username,
                    password: password
                }, JWT_SECRET_KEY);
                res.status(200).json({
                    msg: "Login successfully",
                    token: newToken
                })
            }
            else {
                res.status(403).json({
                    msg: "Password incorrectly",
                    token: null
                })
            }
        }
        else {
            res.status(403).json({
                msg: "Can not find this account",
                token: null
            })
        }
    }).catch((err) => {
        res.status(403).json({
            msg: err,
            token: null
        })
    })
}


module.exports = AuthHandler;