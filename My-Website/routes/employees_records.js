const express = require('express');
const router = express.Router();
const employeeModel = require('../modules/employee');
const employee = employeeModel.find({});
var msg = ["",
    "Duplicate data cannot be inserted.",
    "Record Inserted Successfully.",
    "Record Updated Successfully.",
    "Record Deleted."
];
var flag = 0;

router.get('/', (req, res) => {
    employee.exec((err, data) => {
        if (err)
            throw err;
        res.render('employeesRecords', {
            title: 'Employees Records',
            records: data,
            success: msg[flag]
        });
        flag = 0;
    });
});
router.post('/', (req, res) => {
    employee.exec((err, data) => {
        if (err)
            throw err;
        var i;
        for (i = 0; i < data.length; i++) {
            if (req.body.email == data[i].email) {
                flag = 1;
                return res.redirect('/employees_records#lineBreak');
            }
        }
        const empDetails = new employeeModel({
            name: req.body.uname,
            email: req.body.email,
            etype: req.body.emptype,
            hourlyrate: req.body.hrlyrate,
            totalHour: req.body.ttlhr,
            totalSal: parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr)
        });
        empDetails.save((err, data) => {
            if (err)
                throw err;
            flag = 2;
            res.redirect('/employees_records#lineBreak');
        });
    });
});

router.get('/edit/:id', (req, res) => {
    var id = req.params.id;
    const edit = employeeModel.findById(id);
    edit.exec((err, data) => {
        if (err)
            throw err;
        //console.log(data);
        res.render('edit', {
            title: 'Edit Employees Records',
            records: data
        });
    });
});
router.post('/edit/:id', (req, res) => {
    const update = employeeModel.findByIdAndUpdate(req.body.id, {
        name: req.body.uname,
        email: req.body.email,
        etype: req.body.emptype,
        hourlyrate: req.body.hrlyrate,
        totalHour: req.body.ttlhr,
        totalSal: parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr)
    });
    update.exec((err, data) => {
        if (err)
            throw err;
        //console.log(data);
        flag = 3;
        res.redirect('/employees_records#lineBreak');
    });
});

router.get('/delete/:id', (req, res) => {
    var id = req.params.id;
    const del = employeeModel.findByIdAndDelete(id);
    del.exec((err, data) => {
        if (err)
            throw err;
        //console.log(data);
        flag = 4;
        res.redirect('/employees_records#lineBreak');
    });
});

module.exports = router;
