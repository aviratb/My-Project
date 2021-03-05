const express = require('express');
const router = express.Router();
const signedupModel = require('../modules/signedupuser');
const signedupuser = signedupModel.find({});
var name;
var contactName1 = '';

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
        res.render('site', {
            titleLogin: 'Sign Up/Login',
            messageLogin: 'Invalid email id or password.',
            name1 : ''
        });
    });
}

router.get('/', (req, res) => {
    res.render('site', {
        titleLogin: 'Sign Up/Login',
        messageLogin: '',
        name1 : contactName1
    });
});
router.post('/', loginValidation, (req, res) => {
    res.redirect('/dashboard');
});
router.post('/temp', (req, res) => {
    contactName1 = req.body.name1;
    res.redirect('/#contactUs');
});
router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: `${name}`,
        message: `Hello, I am ${name}. This is my personal workspace.`
    });
});

module.exports = router;
