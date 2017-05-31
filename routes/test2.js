"use strict";

const express = require('express');
const router = express.Router();
const path = require('path');
const InvoiceModel = require('../model/invoice');

router.get('/', function(req,res){
	res.sendFile(path.join(__dirname + '/../test2/view/index.html'));
});

router.post('/add_invoice', function(req,res){
	var obj = {};
	var InvoiceNumber = req.body.InvoiceNumber;
	var InvoiceDate = req.body.InvoiceDate;
	var InvoiceAmount = req.body.InvoiceAmount;
	var InvoiceDueDate = req.body.InvoiceDueDate;
	var CustomerNumber = req.body.CustomerNumber;
	var ItemName = req.body.ItemName;
	var ItemCost = req.body.ItemCost;
	var errors = req.validationErrors();
	if (errors) {
		console.log('error on adding');
	} else {
		var item = new InvoiceModel({
			InvoiceNumber : InvoiceNumber,
			InvoiceDate : InvoiceDate,
			InvoiceAmount : InvoiceAmount,
			InvoiceDueDate : InvoiceDueDate,
			CustomerNumber : CustomerNumber,
			ItemName : ItemName,
			ItemCost : ItemCost
		});
		item.save(function(err){
			if (err) throw err;
		})
	}
	res.send('saved');
});

router.put('/update_approval_invoice', function(req,res){
	var obj = {};
	var approved = req.body.approved;
	var invoice_id = req.body.invoice_id;

	InvoiceModel.findOneAndUpdate({
		_id : invoice_id
	},
		{ 
			$set: 
				{ 
					approved: approved
				 },

		},
		{ upsert: false },
		function(err, newInvoice){
			if (err) {
				console.log("errors tanga");
			} else {
				console.log(newInvoice);
			}
	});
	res.send('success');
});

router.put('/update_invoice', function(req,res){
	var obj = {};
	var invoice_id = req.body.invoice_id;
	var InvoiceNumber = req.body.InvoiceNumber;
	var InvoiceDate = req.body.InvoiceDate;
	var InvoiceAmount = req.body.InvoiceAmount;
	var InvoiceDueDate = req.body.InvoiceDueDate;
	var CustomerNumber = req.body.CustomerNumber;
	var ItemName = req.body.ItemName;
	var ItemCost = req.body.ItemCost;
	var approved = req.body.approved;

	InvoiceModel.findOneAndUpdate({
		_id : invoice_id
	},
		{ 
			$set: 
				{ 
					InvoiceNumber: InvoiceNumber,
					InvoiceDate : InvoiceDate,
					InvoiceAmount : InvoiceAmount,
					InvoiceDueDate : InvoiceDueDate,
					CustomerNumber : CustomerNumber,
					ItemName : ItemName,
					ItemCost : ItemCost,
					approved : approved
				 },

		},
		{ upsert: false },
		function(err, newInvoice){
			if (err) {
				console.log("errors tanga");
			} else {
				console.log(newInvoice);
			}
	});
	res.send('success');
});

router.delete('/delete_invoice', function(req,res){
	var obj = {};
	var invoice_id = req.body.invoice_id;
	InvoiceModel.findOneAndRemove({_id:invoice_id})
		.exec()
		.then((invoice) => {
			console.log('deleted');
			res.json('deleted');
		})
		.catch((err) => {
			res.send('error');
		})
})

router.get('/show_al_invoice', function(req,res){
	InvoiceModel.find({})
	.exec()
	.then((invoice) => {
		res.send(invoice)
	})
	.catch((err) => {
		res.send('error');
	});
});

router.get('/show_invoice', function(req,res){
	InvoiceModel.find({})
	.where('approved').equals('0')
	.exec()
	.then((invoice) => {
		res.send(invoice);
	})
	.catch((err) => {
		res.send('error');
	})
})

router.get('/show_approved', function(req,res){
	InvoiceModel.find({})
	.where('approved').equals('1')
	.exec()
	.then((invoice) => {
		res.send(invoice);
	})
	.catch((err) => {
		res.send('error');
	})
})

router.get('/show_one_invoice/:id', function(req,res){
	InvoiceModel.findOne({_id:req.params.id})
	.exec()
	.then((invoice) => {
		res.send(invoice);
	})
	.catch((err) => {
		res.send('error');
	})
})

module.exports = router;