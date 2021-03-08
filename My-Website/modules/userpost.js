const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aviratb:avi995599@cluster0.7fqrw.mongodb.net/mydatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;

const userpostSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const userPostModel = mongoose.model('Userpost', userpostSchema);
module.exports = userPostModel;