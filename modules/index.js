var User = require('../dao').Customer;
var winston = require('winston');
var mongoose = require('mongoose');
var customerSchema = require('../dao').customerSchema;
var Customer = mongoose.model('customerM', customerSchema);
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());

var error_message;
var regexEmailFormat = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$");
var regexCustomeridFormat = new RegExp ("^[0-9]{9,9}$");


exports.create = function(request, response){
	
	winston.log('info', 'Create customer request recieved');
	if (regexEmailFormat.test(request.body.email)) 
	{
		winston.log('info', 'Valid email format');
	} 
	else 
	{
		winston.log('info', 'Invalid email format');
		return response.status(200).json({success: false,msg: 'Email is invalid'});
	}
		
	if (regexCustomeridFormat.test(request.body.customerid)) 
	{
		//winston.log('info', 'Valid customer ID');
	} 
	else {
		//winston.log('info', 'Invalid customer ID');
		winston.log('info', 'Cannot create customer - invalid customer ID');
		return response.status(200).json({success: false,msg: 'Customer ID format is invalid'});
	}
	
	if (typeof request.body.name === 'undefined' || request.body.name === null) 
	{
		winston.log('info', 'Cannot create customer - invalid customer name');
		return response.status(200).json({success: false,msg: 'Customer name must contain value'});
	}
	
	if (typeof request.body.address === 'undefined' || request.body.address === null) 
	{
		winston.log('info', 'Cannot create customer - invalid customer address');
		return response.status(200).json({success: false,msg: 'Customer address must contain value'});
	}
	
	if (typeof request.body.credit_card_tokens === 'undefined' || request.body.credit_card_tokens === null
		|| request.body.credit_card_tokens.length === 0 ) 
	{
		winston.log('info', 'Cannot create customer - Customer must have at least one token');
		return response.status(200).json({success: false,msg: 'Customer must have at least one token'});
	}
		
	var newCustomer = new Customer(
				{
				  _id: request.body.customerid,
				  name: request.body.name,
				  email: request.body.email,
				  address: request.body.address,
				  credit_card_tokens:request.body.credit_card_tokens
				 });
				newCustomer.save(function (err) {
				  if (err) 
				  {
					  winston.log('error', err.code);
					  error_message = err;
				  }
				});
		winston.log('info', error_message);
	if (error_message)
	{
		winston.log('error', error_message);
		if(error_message.code === 11000)
		{
			winston.log('error', 'Cannot create customer - user with requested ID already exists ' + request.body.customerid);
			response.status(401).json({success: false,msg: 'user with requested ID already exists'});
		}
		else
		{
			winston.log('error', 'Cannot create customer - ' + error_message.err);
			response.status(401).json({success: false,msg: error_message.err});
		}
	}
	else
	{
		winston.log('info', 'Customer with ID ' + request.body.customerid + ' was successfully created');
		response.status(200).json({success: true,msg: request.body.customerid});
	}
};

exports.delete = function(request, response){
	
	winston.log('info', 'Delete customer request recieved');
	Customer.findByIdAndRemove(request.body.customerid, function (err,removedCustomer) {
		  if (err) 
		  {
			winston.log('error', err);
			response.status(200).json({success: false,msg: 'Error ocurred ' + err});
		  }
		else
		{
		  if (typeof removedCustomer === 'undefined' || removedCustomer === null) 
		  {
		    winston.log('info', 'Customer could not be deleted');
			response.status(200).json({success: false,msg: 'Customer could not be deleted'});
		  }
		  else
		  {
			winston.log('info', 'Customer with ID ' + request.body.customerid + ' was successfully deleted');
		    response.status(200).json({success: true,msg: 'customer with id ' + request.body.customerid + ' was successfully deleted '}); 
		  }
		}
		});
};

exports.fetch = function(request, response){
	
	var fetchedCustomer;
	winston.log('info', 'Fetch customer request recieved');
	
	Customer.findById(request.headers.customerid , function (err, fetchedCustomer){
	  if (err) 
	  {
		winston.log('error', err);
		response.status(200).json({success: false,msg: 'Error ocurred ' + err});
	  }
	  else
	  {
		  if (typeof fetchedCustomer === 'undefined' || fetchedCustomer === null) 
		  {
			response.status(200).json({success: false,msg: 'Customer could not be found'});
		  }
		  else
		  {
			response.status(200).json({success: true,customer: fetchedCustomer});  
		  }
	  }
	});
};

exports.update = function(request, response){
	
	var returnedCustomer;
	winston.log('info', 'Update customer request recieved');
	
	if (typeof request.body.customerid === 'undefined' || request.body.customerid === null || request.body.customerid === "") 
	{
		return response.status(200).json({success: false,msg: 'Customer could not be updated - no customer ID was provided'});
	}
	
	if (!regexCustomeridFormat.test(request.body.customerid)) 
	{
		return response.status(200).json({success: false,msg: 'Customer could not be updated - customer ID format invalid'});
	}
	
	var query = {
		'_id': request.body.customerid
	};
	
	var update = {};
	
	if (typeof request.body.name !== 'undefined') 
	{
		if(request.body.name !== null)
		{
			update['name'] = request.body.name;
			winston.log('info', update);
		}
	}
	
	if (typeof request.body.email !== 'undefined') 
	{
		if(request.body.email !== null)
		{
			if (!regexEmailFormat.test(request.body.email)) 
			{
				winston.log('info', 'Invalid email format');
				return response.status(200).json({success: false,msg: 'Customer could not be updated - Email is invalid'});
			}
			update['email'] = request.body.email;
			winston.log('info', update);
		}
	}
	
	if (typeof request.body.address !== 'undefined') 
	{
		if (request.body.address !== null)
		{
			update['address'] = request.body.address;
			winston.log('info', update);
		}
	}
	 
	if (typeof request.body.credit_card_tokens !== 'undefined') 
	{
		if (request.body.credit_card_tokens !== null) 
		{
			if (request.body.credit_card_tokens.length === 0 ) 
			{
				return response.status(200).json({success: false,msg: 'Customer could not be updated - Customer must have at least one token'});
			}
		
			update['credit_card_tokens'] = request.body.credit_card_tokens;
			winston.log('info', update);
		}
	}

	var options = {
		upsert: true,				//	Create a new document if the query finds zero documents matching the query.
		setDefaultsOnInsert : true,	//	When creating a new document, include schema default values. 
		new: true
	};
	
	Customer.findOneAndUpdate(query, update, options, function(err, returnedCustomer) {
	  if (err) {
		winston.log('error', err);
		response.status(200).json({success: false,msg: 'Error ocurred ' + err});
	  }
	  else
	  {
		  if (typeof returnedCustomer === 'undefined' || returnedCustomer === null) 
		  {
			winston.log('error', 'Customer could not be updated ' + returnedCustomer);
			response.status(200).json({success: false,msg: 'Customer could not be updated'});
		  }
		  else
		  {
		    winston.log('info', 'Customer was updated successfully');
			response.status(200).json({success: true,msg: 'Customer was updated successfully'});
		  }
	  }
	});
};
