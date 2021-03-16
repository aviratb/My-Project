const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const productModel = require('../modules/product');
const product = productModel.find({});
const orderModel = require('../modules/order');
const order = orderModel.find({});

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

router.get('/', checkLogin, (req, res) => {
    res.render('users', {
        title: 'Users Panel'
    });
});

var middleware = (req, res, next) => {
    const k = productModel.find({ product: req.body.product })
    k.exec((err, data) => {
        if (err)
            throw err;
        var value = 0;
        for (let i = 0; i < data.length; i++) {
            value = value + data[i].inStockQty;
        }
        if (value > req.body.quantity) {
            const orderDetails = new orderModel({
                customerName: req.body.customerName,
                product: req.body.product,
                quantity: req.body.quantity,
                warehouse: req.body.warehouse,
                status: "confirmed"
            });
            orderDetails.save((err) => {
                if (err)
                    throw err;
                const update = productModel.findOneAndUpdate(
                    {
                        product: req.body.product,
                        warehouse: req.body.warehouse
                    },
                    {
                        $inc: { inStockQty: - parseInt(req.body.quantity) }
                    },
                    {
                        new: true,
                        useFindAndModify: false
                    });
                update.exec((err) => {
                    if (err)
                        throw err;
                    res.redirect('/users/orders');
                });
            });
        }
        else {
            next();
        }
    });
}

router.get('/orders', checkLogin, (req, res) => {
    order.exec((err, data) => {
        if (err)
            throw err;
        res.render('usersOrderDetails', {
            title: 'Order Details',
            orders: data,
            success: "",
            error: "",
        });
    });
});
router.post('/orders', middleware, checkLogin, (req, res) => {
    order.exec((err, data) => {
        if (err)
            throw err;
        res.render('usersOrderDetails', {
            title: 'Order Details',
            orders: data,
            success: "",
            error: "Sorry, Quantity greater than available in stock. Please enter lesser quantity."
        });
    });
});

router.get('/orders/cancel/:id', checkLogin, (req, res) => {
    var id = req.params.id;
    const cancel = orderModel.findById(id);
    cancel.exec((err, data) => {
        if (err)
            throw err;
        const productupdate = productModel.findOneAndUpdate(
            {
                product: data.product,
                warehouse: data.warehouse
            },
            {
                $inc: { inStockQty: parseInt(data.quantity) }
            },
            {
                new: true,
                useFindAndModify: false
            });
        productupdate.exec((err) => {
            if (err)
                throw err;
            const orderUpdate = orderModel.findByIdAndUpdate(id,
                {
                    $set: { status: "cancelled" }
                },
                {
                    new: true,
                    useFindAndModify: false
                });
            orderUpdate.exec((err) => {
                if (err)
                    throw err;
                res.redirect('/users/orders');
            });
        });
    });
});

module.exports = router;
