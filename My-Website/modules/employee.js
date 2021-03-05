const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aviratb:avi995599@cluster0.7fqrw.mongodb.net/mydatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;

const employeeSchema =new mongoose.Schema({
	name: String,
	email: String,
	etype: String,
	hourlyrate: Number,
	totalHour: Number,
	totalSal: Number
});

const employeeModel = mongoose.model('Employee', employeeSchema);
module.exports = employeeModel;