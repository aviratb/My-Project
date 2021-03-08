const express = require('express');
const router = express.Router();
const signedupModel = require('../modules/signedupuser');
const signedupuser = signedupModel.find({});
var name;
var msg = ["",
    "Invalid email id or password."
];
var flag = 0;

var loginValidation = (req, res, next) => {
    signedupuser.exec((err, data) => {
        if (err)
            throw err;
        var i;
        for (i = 0; i < data.length; i++) {
            if (req.body.email == data[i].email && req.body.pwd == data[i].password) {
                name = data[i].name;
                return next();
            }
        }
        flag = 1;
        res.redirect('/');
    });
}

router.get('/', (req, res) => {
    res.render('site', {
        titleLogin: 'Sign Up/Login',
        messageLogin: msg[flag]
    });
    flag = 0;
});
router.post('/', loginValidation, (req, res) => {
    res.redirect('/dashboard');
});

router.post('/temp', (req, res) => {
    res.redirect('/#contactUs');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: `${name}`,
        message: `Hello, I am ${name}. This is my personal workspace.`
    });
});

module.exports = router;
