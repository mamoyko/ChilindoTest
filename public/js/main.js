$(document).ready(function(){
    $('.contactnumber').mask('+00-000-000-0000');
    $('.SSnumber').mask('000-00-0000');
});

$(function(){

    var form = $('#submit_form');
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
            firstname : {
                required : true
            },
            middlename : {
                required : true
            },
            lastname : {
                required : true
            },
            homephone : {
                required : true,
                minlength : 12
            },
            mobilephone : {
                required : true,
                minlength : 12
            },
            emailaddress : {
                required : true,
                email: true
            },
            mailingaddress : {
                required : true
            },
            SSnumber : {
                required : true,
                minlength : 9
            },
            EmployersName : {
                required : true
            },
            EmployersAddress : {
                required : true
            },
            WorkPhone : {
                required : true,
                minlength : 12
            },
            JobPosition : {
                required : true
            },
            AccountType : {
                required : true
            },
            PurposeBankAccount : {
                required : true
            },
            MoneySource : {
                required : true
            },
            hereAbout : {
                required : true
            },
            utilitybill : {
                required : true,
                extension: "docx|doc|pdf"
            },
            ssdocu : {
                required : true,
                extension: "docx|doc|pdf"
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

    var displayConfirm = function() {
        $('#tab5 .form-control-static', form).each(function(){
            var input = $('[name="'+$(this).attr("data-display")+'"]', form);
            if (input.is(":text") || input.is("textarea") || input.is(":file")) {
                $(this).html(input.val());
            } else if (input.is("select")) {
                $(this).html(input.find('option:selected').text());
            }
        });
    }

    var handleTitle = function(tab, navigation, index) {
        var total = navigation.find('li').length;
        var current = index + 1;
        // set wizard title
        $('.step-title', $('#form_wizard_1')).text('Step ' + (index + 1) + ' of ' + total);
        // set done steps
        jQuery('li', $('#form_wizard_1')).removeClass("done");
        var li_list = navigation.find('li');
        for (var i = 0; i < index; i++) {
            jQuery(li_list[i]).addClass("done");
        }

        if (current == 1) {
            $('#form_wizard_1').find('.button-previous').hide();
        } else {
            $('#form_wizard_1').find('.button-previous').show();
        }

        if (current >= total) {
            form.find('.button-submit').show();
            displayConfirm();
        } else {
            $('#form_wizard_1').find('.button-next').show();
            $('#form_wizard_1').find('.button-submit').hide();
        }
    }


    $('#submit_form').bootstrapWizard({
        onTabClick : function(tab, navigation, index){
            return false;
        },
        onNext : function(tab, navigation, index) {

            if (form.valid() == false) {
                return false;
            }
            handleTitle(tab, navigation, index);
        },
        onTabShow : function(tab, navigation, index){
            var $total = navigation.find('li').length;
            var $current = index+1;
            var $percent = ($current/$total) * 100;
            $('#submit_form .progress-bar').css({width:$percent+'%'});
        }
    })
});

$(function(){
    $('.button-submit').click(function(){
        var confirmation = ['0', '1'];
        var rand = confirmation[Math.floor(Math.random() * confirmation.length)];
        var data = {};
        data.title = $('#title').val();
        data.firstname = $('#firstname').val();
        data.middlename = $('#middlename').val();
        data.lastname = $('#lastname').val();
        data.homephone = $('#homephone').val();
        data.mobilephone = $('#mobilephone').val();
        data.emailaddress = $('#emailaddress').val();
        data.mailingaddress = $('#mailingaddress').val();
        data.SSnumber = $('#SSnumber').val();
        data.EmployersName = $('#EmployersName').val();
        data.EmployersAddress = $('#EmployersAddress').val();
        data.WorkPhone = $('#WorkPhone').val();
        data.JobPosition = $('#JobPosition').val();
        data.AccountType = $('#AccountType').val();
        data.PurposeBankAccount = $('#PurposeBankAccount').val();
        data.MoneySource = $('#MoneySource').val();
        data.hereAbout = $('#hereAbout').val()
        data.rand = rand;

        if ( rand == '0') {
            $('#openmodal').click();
            //var application_number = Math.floor((Math.random() * 999) + 1);
            var htmlData = '';
            htmlData += '<div class="error">';
            htmlData += '<div class="errortitle">';
            htmlData += '<p>Rejected</p>';
            htmlData += '</div>';
            htmlData += '<i class="fa fa-times fa-4x" aria-hidden="true"></i>';
            htmlData += '<div class="contenterror">';
            htmlData += '<p>Hi '+ data.firstname + ' ' + data.middlename + ' ' + data.lastname +' ,Sorry to inform you that your request is rejected. Please contact our local branch, for questions. Thanks <strong>+99 999 999 9999</strong> to verify your account.</p>';
            htmlData += '</div>';
            htmlData += '</div>';
            $('#myModal .modal-body').html(htmlData);
        } else {
            $('#openmodal').click();
            var account_number = Math.floor((Math.random() * 999999999) + 1);
            var htmlData = '';
            htmlData += '<div class="success">';
            htmlData += '<div class="successtitle">';
            htmlData += '<p>Success</p>';
            htmlData += '</div>';
            htmlData += '<i class="fa fa-check fa-4x" aria-hidden="true"></i>';
            htmlData += '<div class="contentsuccess">';
            htmlData += '<p>Hi '+ data.firstname + ' ' + data.middlename + ' ' + data.lastname +' ,Your request is sucessfull. This is your account number <strong>'+account_number+'</strong> </p>';
            htmlData += '</div>';
            htmlData += '</div>';
            $('#myModal .modal-body').html(htmlData);
        }
    });
});

$(function(){
    $('#btn-modal-close').click(function(){
       location.reload();
    })
})