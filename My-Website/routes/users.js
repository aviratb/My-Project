const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productModel = require('../modules/product');
const product = productModel.find({});
const orderModel = require('../modules/order');
const order = orderModel.find({});

router.get('/', (req, res) => {
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

router.get('/orders', (req, res) => {
    order.exec((err, data) => {
        if (err)
            throw err;
        res.render('usersOrderDetails', {
            title: 'Order Details',
            orders: data,
            success: "",
            error: "",
            new: ""
        });
    });
});
router.post('/orders', middleware, (req, res) => {
    order.exec((err, data) => {
        if (err)
            throw err;
        res.render('usersOrderDetails', {
            title: 'Order Details',
            orders: data,
            success: "",
            error: "Sorry, Quantity greater than available in stock. Please enter lesser quantity.",
            new: ""
        });
    });

});

router.get('/orders/cancel/:id', (req, res) => {
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
                res.render('usersOrderDetails', {
                    title: 'Order Details',
                    orders: data,
                    success: "",
                    error: "",
                    new: "cancelled"
                });
            })
        });
    });
});

module.exports = router;
