const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const site = require('./routes/site');
const signup = require('./routes/signup');
const employeesRecords = require('./routes/employees_records');
const admin = require('./routes/admin');
const users = require('./routes/users');
const players = require('./routes/players');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/abc', express.static('assets'));
app.use('/', site);
app.use('/signup', signup);
app.use('/employees_records', employeesRecords);
app.use('/admin', admin);
app.use('/users', users);
app.use('/players', players);

app.listen(port, () => {
    console.log(`Server is running on port : http://localhost:${port}`)
});