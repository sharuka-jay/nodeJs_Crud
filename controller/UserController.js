// //const { response } = require('express')
const User = require('../models/User')

// show the list of users
const index = (req, res, next) => {
    User.find().then
        (response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'an eror occured!'
            })
        })
}

// show user by id
const show = (req, res, next) => {
    let userID = req.body.userID
    User.findById(userID)
        .then(response => {
            res.json({
                response
            })
        }).catch(error => {
            res.json({
                message: 'an eror occured!'
            })
        })
}

// // add new user
// const store = (req, res, next) => {
//     let user = new User({
//         firstName: req.body.name,
//         lastName: req.body.firstName,
//         email: req.body.email,
//         password: req.body.password
//     })
//     user.save()
//         .then(response => {
//             res.json({
//                 message: 'user added successfully'
//             })
//         })
//         .catch(error => {
//             res.json({
//                 message: 'an eror occured!'
//             })
//         })
// }

const login = (req,res,next)=> {
    res.render('login') 
}

const register = (req,res)=>{
    res.render('register')
}

// const save = (req,res)=>{

// }


module.exports = {
    index, show,login,register
}
