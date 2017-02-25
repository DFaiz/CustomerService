var express = require('express');
var bodyParser = require('body-parser');
var winston = require('winston');

var assert = require('assert');

var customerManager = require('./modules');

var app = express();

//Init Winston logger, max file size 5MB with 10 file retention
winston.add(winston.transports.File, { filename: './log/server.log', level: 'info',handleExceptions: true,
            maxsize: 5242880,maxFiles: 10});
winston.remove(winston.transports.Console);

winston.log('info', '*********************************************************');
winston.log('info', '******-***************************************************');
winston.log('info', '*********************************************************');
winston.log('info', 'Eclipse web server - start up process');
winston.log('info', 'Express server mode initialized');
winston.log('info', 'using bodyParser()');	
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
winston.log('info', 'using bodyParser.text()');	
app.use(bodyParser.text());
winston.log('info', 'initialize HTML directory');
app.use(express.static(__dirname + '/public'));
winston.log('info', 'initialized HTML directory');

app.post('/createCustomer', customerManager.create);

app.put('/updateCustomer', customerManager.update);

app.delete('/deleteCustomer', customerManager.delete);

app.get('/getCustomer', customerManager.fetch);
	
winston.log('info', 'binding port 8080 on IP 127.0.0.1');
app.listen(8080,"127.0.0.1");
winston.log('info', 'server running at http://127.0.0.1:8080');
console.log('Server running at http://127.0.0.1:8080/');