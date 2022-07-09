const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require("joi");
// const User = require('../models/User')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        // var emails = req.body.email

        // const checkUser = User.findOne({emails});
        // const users = User.findOne({ email: req.body.email });
        // //    console.log(emails )
        //    console.log(checkUser.email )

        //////////
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    return res.status(409).send({ message: "Email already exits" })
                } else {
                    let user = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hashedPass
                    })
                    user.save()
                        .then(response => {
                            res.render("login")
                        })
                        .catch(error => {
                            res.json({
                                message: 'An error occured '
                            })
                        })
                }
            })
    })
}

const login = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({ email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1h' })
                        res.json({
                            message: 'Login Successfull',
                            token
                        })
                    } else {
                        res.json({
                            message: 'password does not match'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'No User Found'
                })
            }
        })
}

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        //password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
};


module.exports = { register, login, validate }