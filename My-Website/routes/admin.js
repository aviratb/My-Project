const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productModel = require('../modules/product');
const product = productModel.find({});
const orderModel = require('../modules/order');
const order = orderModel.find({});

router.get('/', (req, res) => {
    res.render('admin', {
        title: 'Admin Panel'
    });
});

router.get('/products', (req, res) => {
    product.exec((err, data) => {
        if (err)
            throw err;
        res.render('productDetails', {
            title: 'Product Details',
            products: data,
            success: ""
        });
    });
});
router.post('/products', (req, res) => {
    const update = productModel.findOneAndUpdate(
        {
            product: req.body.product,
            warehouse: req.body.warehouse
        },
        {
            $inc: { inStockQty: parseInt(req.body.inStockQty) }
        },
        {
            new: true,
            useFindAndModify: false
        });
    update.exec((err, data) => {
        if (err)
            throw err;
        //console.log(data);
        if (data != null) {
            res.redirect('/admin/products#lineBreak');
        }
        else {
            const productDetails = new productModel({
                product: req.body.product,
                inStockQty: req.body.inStockQty,
                warehouse: req.body.warehouse
            });
            productDetails.save((err) => {
                if (err)
                    throw err;
                res.redirect('/admin/products#lineBreak');
            });
        }
    });
});

router.get('/orders', (req, res) => {
    order.exec((err, data) => {
        if (err)
            throw err;
        res.render('adminOrderDetails', {
            title: 'Order Details',
            orders: data,
            success: ""
        });
    });
});

module.exports = router;
