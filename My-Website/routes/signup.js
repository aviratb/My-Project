const express = require('express');
const router = express.Router();
const signedupModel = require('../modules/signedupuser');
const signedupuser = signedupModel.find({});
var msg = ["",
    "User already exists. Please login.",
    "Sign up successful. Please click on login button."
];
var flag = 0;

var signupValidation = (req, res, next) => {
    signedupuser.exec((err, data) => {
        if (err)
            throw err;
        var i;
        for (i = 0; i < data.length; i++) {
            if (req.body.email == data[i].email) {
                flag = 1;
                return res.redirect('/signup');
            }
        }
        const signedupusers = new signedupModel({
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            address: req.body.address,
            password: req.body.pwd
        });
        signedupusers.save((err, res) => {
            if (err)
                throw err;
            next();
        });
    });
};

router.get('/', (req, res) => {
    res.render('signup', {
        title: 'Sign Up Page',
        message: msg[flag]
    });
    flag = 0;
});
router.post('/', signupValidation, (req, res) => {
    flag = 2;
    res.redirect('/signup');
});

module.exports = router;
