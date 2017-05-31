"use strict";

var express = require('express');
var router = express.Router();
const path = require('path');

router.get('/', function(req,res){
	res.sendFile(path.join(__dirname + '/../test1/view/index.html'));
});

module.exports = router;