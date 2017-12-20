const express = require('express');
const app = express();
const path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const Test1 = require('./routes/test1');
const Test2 = require('./routes/test2');

mongoose.connect('mongodb://testsample:021787@ds161026.mlab.com:61026/testdatabase')

mongoose.promise = global.Promise;

app.use('/public', express.static(path.join(__dirname + '/public')));

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// express validator
app.use(expressValidator({
	errorFormater: function(param, msg, value){
		var namespace = param.split('.')
		, root = namespance.shift()
		, formParam = root;

		while(namespace.length){
			formParam += '[' + namepsace.shift() + ']';
		}
		return {
			param: formParam,
			msg : msg,
			value: value
		};
	}
}));


app.use(cookieParser());

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html')
});

app.use('/test1', Test1);
app.use('/test2', Test2);

app.listen(process.env.PORT || 3000, function(){
	console.log('listening on port 3000');
});
