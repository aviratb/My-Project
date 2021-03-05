/*
var validation = (req, res, next) => {
    if (req.params.username == undefined) {
        res.render('login', {title : 'Login Page', message : 'Enter username and password'});
    }
    else if (req.params.username == 'Avirat') {
        //console.log(`Login successful`);
        //console.log(req.params);
        next();
    }
    else {
        //console.log('Unauthorised user');
        //console.log(req.params);
        res.send(`<h3>Authentication failed....</h3>`);
    }
}

router.get('/login/:username?', validation, (req, res) => {
    res.render('view1', {title : 'Kittens Club', message : 'dashboard of kittens'});
});
*/


