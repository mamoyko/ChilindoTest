var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var invoiceschema = mongoose.Schema({
  	InvoiceNumber : {
  		type : String
  	},
  	InvoiceDate : {
  		type : String
  		// default:function(){
  		// 	return Date.now();
  		// }
  	},
  	InvoiceAmount : {
  		type : String
  	},
  	InvoiceDueDate : {
  		type : String
  	},
  	CustomerNumber : {
  	 	type : String
  	},
  	ItemName : {
  		type : String
  	},
  	ItemCost : {
  		type : String
  	},
  	approved : {
  		type : String,
  		default : 0
  	}
});

var Invoice = mongoose.model('Invoice', invoiceschema);

module.exports = Invoice;