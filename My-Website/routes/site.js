const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const signedupModel = require('../modules/signedupuser');
const signedupuser = signedupModel.find({});
var name;
var msg = ["",
    "Invalid email id or password."
];
var flag = 0;

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const checkLogin = (req, res, next) => {
    var myToken = localStorage.getItem('myToken');
    try {
        jwt.verify(myToken, 'loginToken');
    } catch (err) {
        return res.send("You are not logged in. Please login to access this page....");
    }
    next();
}
module.exports = checkLogin;

var loginValidation = (req, res, next) => {
    signedupuser.exec((err, data) => {
        if (err)
            throw err;
        var i;
        for (i = 0; i < data.length; i++) {
            if (req.body.email == data[i].email && req.body.pwd == data[i].password) {
                name = data[i].name;
                var token = jwt.sign({ id: data[i]._id }, 'loginToken');
                localStorage.setItem('myToken', token);
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
router.post('/', loginValidation, checkLogin, (req, res) => {
    res.redirect('/dashboard');
});

router.post('/temp', (req, res) => {
    res.redirect('/#contactUs');
});

router.get('/dashboard', checkLogin, (req, res) => {
    res.render('dashboard', {
        title: `${name}`,
        message: `Hello, I am ${name}. This is my personal workspace.`
    });
});

/*router.get('/login', function (req, res, next) {
    var token = jwt.sign({ foo: 'bar' }, 'loginToken');
    localStorage.setItem('myToken', token);
    res.send("Login Successfully");
});*/

router.get('/logout', function (req, res, next) {
    localStorage.removeItem('myToken');
    res.redirect("/");
});

module.exports = router;
