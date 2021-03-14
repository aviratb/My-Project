const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aviratb:avi995599@cluster0.7fqrw.mongodb.net/mydatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;

const orderSchema = new mongoose.Schema({
    customerName: String,
    product: String,
    quantity: Number,
    warehouse: String,
    status: String
});

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;