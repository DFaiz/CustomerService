var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({

	//	index: true => Tells mongo to index this paramater because it is used frequently. It makes querying faster
	_id: {type: String, unique: true},  // unique customer ID

	name: {type: String, required: true}, // Customer name

	email: {type: String, required: true}, // Customer email
 
	address: {type: String, required: true}, // Customer address

	credit_card_tokens: [{ card_token :{type: String} }]

}, {collection: 'customers'});

exports.customerSchema = customerSchema;