$(function(){
	var i = 1;
	var obj = [];
	var data = {};

	var form = $('#text2form');
	var error = $('.alert-danger', form);
	var success = $('.alert-success', form);

	form.validate({
	    doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
	    errorElement: 'span', //default input error message container
	    errorClass: 'help-block help-block-error', // default input error message class
	    focusInvalid: false, // do not focus the last invalid input
	    rules: {
	        //account
	        title: {
	            required: true
	        },
	        InvoiceNumber : {
	            required : true
	        },
	        InvoiceDate : {
	            required : true
	        },
	        InvoiceAmount : {
	            required : true
	        },
	        InvoiceDueDate : {
	            required : true,
	        },
	        CustomerNumber : {
	            required : true,
	        },
	        ItemName : {
	            required : true
	        },
	        ItemCost : {
	            required : true,
	        }
	    },

	    errorPlacement: function (error, element) { // render error placement for each input type
	        if (element.attr("name") == "gender") { // for uniform radio buttons, insert the after the given container
	            error.insertAfter("#form_gender_error");
	        } else if (element.attr("name") == "payment[]") { // for uniform checkboxes, insert the after the given container
	            error.insertAfter("#form_payment_error");
	        } else {
	            error.insertAfter(element); // for other inputs, just perform default behavior
	        }
	    },

	    invalidHandler: function (event, validator) { //display error alert on form submit   
	        success.hide();
	        error.show();
	    },

	    highlight: function (element) { // hightlight error inputs
	        $(element)
	            .closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
	    },

	    unhighlight: function (element) { // revert the change done by hightlight
	        $(element)
	            .closest('.form-group').removeClass('has-error'); // set error class to the control group
	    },

	    success: function (label) {
	        if (label.attr("for") == "gender" || label.attr("for") == "payment[]") { // for checkboxes and radio buttons, no need to show OK icon
	            label
	                .closest('.form-group').removeClass('has-error').addClass('has-success');
	            label.remove(); // remove error label here
	        } else { // display success icon for other inputs
	            label
	                .addClass('valid') // mark the current input as valid and display OK icon
	            .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
	        }
	    },

	    submitHandler: function (form) {
	        success.show();
	        error.hide();
	        //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
	    }

	});



	$('#addInvoice').click(function(){
		if ( !$('#text2form').valid() ) {
		   return false;
		} else {
		   doAjax();
		}
	});

	function doAjax(){
		data.InvoiceNumber = $('#InvoiceNumber').val();
		data.InvoiceDate = $('#InvoiceDate').val();
		data.InvoiceAmount = $("#InvoiceAmount").val();
		data.InvoiceDueDate = $('#InvoiceDueDate').val();
		data.CustomerNumber = $('#CustomerNumber').val();
		data.ItemName = $('#ItemName').val();
		data.ItemCost = $('#ItemCost').val();
		$.ajax({
		    url: '/test2/add_invoice',
		    method: 'POST',
		    contentType: 'application/json',
		    data: JSON.stringify(data),
		    success:function(response){
		        console.log(response);
		        location.reload();
		    },
		    error:function(response){
		        console.log(response);
		    }
		});
	}

	function helloworld(){
		alert('hello');
	}
});

$(document).ready(function(){

	$('#InvoiceNumber').mask('000-000-0000');
	$('.date').mask('00/00/0000');
	$('#InvoiceAmount').mask("###000,000", {reverse: true});
	$('#CustomerNumber').mask('000-000-000-0000');
	$('#ItemCost').mask("###000,000", {reverse: true});

	$('#UpdateInvoiceNumber').mask('000-000-0000');
	$('#UpdateInvoiceAmount').mask("###000,000", {reverse: true});
	$('#UpdateCustomerNumber').mask('000-000-000-0000');
	$('#UpdateItemCost').mask("###000,000", {reverse: true});

	$.getJSON('/test2/show_invoice', function(response){
		var htmlData = '';
		for (var key in response) {
			htmlData += '<tr>';
			htmlData += '<td>'+response[key].InvoiceNumber+'</td>';
			htmlData += '<td>';  
			htmlData += '<button id="btnapprove" class="btn btn-warning" style="margin-right: 5px;" data-id="'+response[key]._id+'">Approve</button>';
			htmlData += '<button id="btndeny" class="btn btn-danger" style="margin-right: 5px;" data-id="'+response[key]._id+'">Deny</button>';
			//htmlData += '<button type="button" id="btnactionmodal" class="btn btn-info" data-id="'+response[key]._id+'">Edit Invoice</button>'
			htmlData += '</td>';
			htmlData += '</tr>';
		}

		$('#tableapprove tbody').append(htmlData);
	})

	$.getJSON( '/test2/show_al_invoice', function( queryResult ) {
	    var table = $('#sample_1').DataTable({
	    responsive: true,
	    autoWidth: false,
	    data: queryResult,
	    columnDefs :
	        [
	            {
	                "targets" : [7],
	                "render" : function(data, type, row, meta){
	                	if ( row['approved'] == '0' ) {
	                		return 'Pending'
	                	} else if ( row['approved'] == '1' ) {
	                		return 'Approved'
	                	} else if ( row['approved'] == '2' ) {
	                		return 'Rejected'
	                	}
	                }
	            },
	            {
	                "targets" : [8],
	                "render" : function(data, type, row, meta){
	                   return  '<div class="btn-group">' +
	                   				'<button style="margin-right:5px" type="button" data-id="'+ row['_id'] +'" class="btn btn-primary btn-xs" id="btnactionmodal">' +
	                   				    '<i class="fa fa-pencil-square-o"></i>' +
	                   				'</button>' +
	                                '<button type="button" id="deletebtn" class="btn btn-danger btn-xs" data-id="'+ row['_id'] +'"><i class="fa fa-trash-o"></i></button>'
	                            '</div>'
	                }
	            }
	        ],
	    columns: 
	        [
	            {
	                "data" : "InvoiceNumber",
	                "title" : "Invoice Number"
	            },
	            {
	                "data" : "InvoiceDate",
	                "title" : "Invoice Date"
	            },
	            {
	                "data" : "InvoiceAmount",
	                "title" : "Invoice Amount"
	            },
	            {
	                "data" : "InvoiceDueDate",
	                "title" : "Invoice DueDate"
	            },
	            {
	                "data" : "CustomerNumber",
	                "title" : "Customer Number"
	            },
	            {
	                "title" : "Item Name",
	                "data" : "ItemName"
	            },
	            {
	                "title" : "Item Cost",
	                "data" : "ItemCost"
	            },
	            {
	            	"title" : "Status"
	            },
	            {
	            	"title" : "Action"
	            }
	        ]
	      });
	});
	
});

$(function(){
	$('#tableapprove').on('click', '#btnapprove', function(){
		var invoice_id = $(this).attr('data-id');
		var data = {};
		data.approved = '1';
		data.invoice_id = invoice_id;
		$.ajax({
		    url: '/test2/update_approval_invoice',
		    method: 'PUT',
		    contentType: 'application/json',
		    data: JSON.stringify(data),
		    success:function(response){
		        console.log(response);
		        location.reload();
		    },
		    error:function(response){
		        console.log(response);
		    }
		});
	});

	$('#tableapprove').on('click', '#btndeny',function(){
		var invoice_id = $(this).attr('data-id');
		var data = {};
		data.approved = '2';
		data.invoice_id = invoice_id;
		$.ajax({
		    url: '/test2/update_approval_invoice',
		    method: 'PUT',
		    contentType: 'application/json',
		    data: JSON.stringify(data),
		    success:function(response){
		        console.log(response);
		        location.reload();
		    },
		    error:function(response){
		        console.log(response);
		    }
		});
	});
})

$(function(){
	$('#InvoiceDate').change(function(){
		

		var newdate = Date.now();

		var invoice_date = new Date($(this).val())

		if(invoice_date > newdate) {
			$(this).css('border-color','#a94442')
		    $('#error-label-date').show();
		}
	});
})

$(function(){

	//validate update invoice

	var form = $('#text2formUpdate');
	var error = $('.alert-danger', form);
	var success = $('.alert-success', form);

	form.validate({
	    doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
	    errorElement: 'span', //default input error message container
	    errorClass: 'help-block help-block-error', // default input error message class
	    focusInvalid: false, // do not focus the last invalid input
	    rules: {
	        //account
	        title: {
	            required: true
	        },
	        UpdateInvoiceNumber : {
	            required : true
	        },
	        UpdateInvoiceDate : {
	            required : true
	        },
	        UpdateInvoiceAmount : {
	            required : true
	        },
	        UpdateInvoiceDueDate : {
	            required : true,
	        },
	        UpdateCustomerNumber : {
	            required : true,
	        },
	        UpdateItemName : {
	            required : true
	        },
	        UpdateItemCost : {
	            required : true,
	        },
	        UpdateStatus : {
	        	required : true
	        }
	    },

	    errorPlacement: function (error, element) { // render error placement for each input type
	        if (element.attr("name") == "gender") { // for uniform radio buttons, insert the after the given container
	            error.insertAfter("#form_gender_error");
	        } else if (element.attr("name") == "payment[]") { // for uniform checkboxes, insert the after the given container
	            error.insertAfter("#form_payment_error");
	        } else {
	            error.insertAfter(element); // for other inputs, just perform default behavior
	        }
	    },

	    invalidHandler: function (event, validator) { //display error alert on form submit   
	        success.hide();
	        error.show();
	    },

	    highlight: function (element) { // hightlight error inputs
	        $(element)
	            .closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
	    },

	    unhighlight: function (element) { // revert the change done by hightlight
	        $(element)
	            .closest('.form-group').removeClass('has-error'); // set error class to the control group
	    },

	    success: function (label) {
	        if (label.attr("for") == "gender" || label.attr("for") == "payment[]") { // for checkboxes and radio buttons, no need to show OK icon
	            label
	                .closest('.form-group').removeClass('has-error').addClass('has-success');
	            label.remove(); // remove error label here
	        } else { // display success icon for other inputs
	            label
	                .addClass('valid') // mark the current input as valid and display OK icon
	            .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
	        }
	    },

	    submitHandler: function (form) {
	        success.show();
	        error.hide();
	        //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
	    }

	});


	$('#sample_1').on('click','#btnactionmodal', function(){
		var invoice_id = $(this).attr('data-id');
		$.getJSON('/test2/show_one_invoice/' + invoice_id, function(response){
			console.log(response);
			$('#btnshowmodal').click();
			$('#invoice_id').val(response._id);
			$('#UpdateInvoiceNumber').val(response.InvoiceNumber);
			$('#UpdateInvoiceDate').val(response.InvoiceDate);
			$('#UpdateInvoiceAmount').val(response.InvoiceAmount);
			$('#UpdateInvoiceDueDate').val(response.InvoiceDueDate);
			$('#UpdateCustomerNumber').val(response.CustomerNumber);
			$('#UpdateItemName').val(response.ItemName);
			$('#UpdateItemCost').val(response.ItemCost);
			$('#UpdateStatus').val(response.approved);
		})
	});

	$('#sample_1').on('click','#deletebtn', function(){
		var invoice_id = $(this).attr('data-id');
		var data = {};
		data.invoice_id = invoice_id;
		$.ajax({
		    url: '/test2/delete_invoice',
		    method: 'DELETE',
		    contentType: 'application/json',
		    data: JSON.stringify(data),
		    success:function(response){
		        console.log(response);
		        location.reload();
		    },
		    error:function(response){
		        console.log(response);
		    }
		});

	});

	$('#UpdateInvoice').click(function(){

		if ( !$('#text2formUpdate').valid() ) {
		   return false;
		} else {
		   doAjax();
		}
	})

	function doAjax(){
		var data = {};
		data.invoice_id = $('#invoice_id').val();
		data.InvoiceNumber = $('#UpdateInvoiceNumber').val();
		data.InvoiceDate = $('#UpdateInvoiceDate').val();
		data.InvoiceAmount = $('#UpdateInvoiceAmount').val();
		data.InvoiceDueDate = $('#UpdateInvoiceDueDate').val();
		data.CustomerNumber = $('#UpdateCustomerNumber').val();
		data.ItemName = $('#UpdateItemName').val();
		data.ItemCost = $('#UpdateItemCost').val();
		data.approved = $('#UpdateStatus').val();
		$.ajax({
		    url: '/test2/update_invoice',
		    method: 'PUT',
		    contentType: 'application/json',
		    data: JSON.stringify(data),
		    success:function(response){
		        console.log(response);
		        location.reload();
		    },
		    error:function(response){
		        console.log(response);
		    }
		});
	}
})