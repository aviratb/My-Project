const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aviratb:avi995599@cluster0.7fqrw.mongodb.net/mydatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;

const signupSchema = new mongoose.Schema({
    name: String,
    gender: String,
    address: String,
    email: String,
    password: String
});

const signupModel = mongoose.model('signedupuser', signupSchema);
module.exports = signupModel;