const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const messages = require('./configuration/messages.js');
const config = require('./configuration/config.json');

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
	
app.use(function(request, response, next) {

    if (request.method !== "GET" && request.method !== "DELETE" && request.method !== "PUT" && request.method !== "POST") {

		winston.log('info', request.method + ' method not supported');
		response.status(405).json(messages.error405Msg);
    } else {
		winston.log('info','Invalid URL request');
		response.status(404).json(messages.error404Msg);
    }
});

app.use(function (error, request, response, next) {
  
  winston.log('error',error.stack);
  response.status(500).json(messages.error500Msg);
});
	
winston.log('info', 'binding port ' + config.port + ' on IP ' + config.host);
app.listen(config.port,config.host);
winston.log('info', 'server running at http://' +config.host+':'+config.port);
console.log('Server running at http://' +config.host+':'+config.port);