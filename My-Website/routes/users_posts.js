const express = require('express');
const router = express.Router();
const userPostModel = require('../modules/userpost');
const userpost = userPostModel.find({});

router.get('/', (req, res) => {
    userpost.exec((err, data) => {
        if (err)
            throw err;
        res.render('usersPosts', {
            title: 'Users Posts',
            posts: data,
            success: ""
        });
    });
});

router.post('/', (req, res) => {
    const userPostDetails = new userPostModel({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    userPostDetails.save((err, data) => {
        if (err)
            throw err;
        res.redirect('/users_posts#lineBreak');
    });
});

module.exports = router;
