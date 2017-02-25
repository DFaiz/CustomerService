var mongoose = require('mongoose');
// set Promise provider to bluebird
mongoose.Promise = require('bluebird');

var winston = require('winston');

// Configuring connection to mongoLab
mongoose.connect('mongodb://dbmanager:12345678@ds011912.mlab.com:11912/mlab_customers');

// Import schema modules
var customerSchema = require('./customerSchema').customerSchema;

// Configure the imported schema as a model and give it an alias
exports.Customer = mongoose.model('customerM' , customerSchema);


// Mongoose connection instance object
var conn = mongoose.connection;


// Report Mongoose connection errors
conn.on('error', function(err){
  winston.log('info', 'connection error:' + err);
});


// On connection event handler
conn.once('open' , function(){
  winston.log('info', 'connected to mongoLab');  
});

// When the node proccess is terminated (Ctrl+c is pressed) , close the connection to the DB.
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    winston.log('info','Mongoose disconnected on app termination');
    process.exit(0);
  });
});