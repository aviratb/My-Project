const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aviratb:avi995599@cluster0.7fqrw.mongodb.net/mydatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;

const productSchema = new mongoose.Schema({
    product: String,
    inStockQty: Number,
    warehouse: String
});

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;