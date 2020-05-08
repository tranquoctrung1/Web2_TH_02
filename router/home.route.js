const express = require('express');
const JsonData = require('../configContent.json');

const route = express.Router();


route.get('/', function(req, res)
{
    const {homeContent} = JsonData
    res.render('home', {
        title: "Home",
        homeContent
    });
}) 


module.exports = route;
