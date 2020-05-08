const express = require('express');
const JsonData = require('../listUser.json');

const route = express.Router();


route.get('/', function(req, res)
{
    if(!req.cookies)
    {
        res.cookie('username', '');
        res.cookie('password', '');
    }
    res.render('login', {title: "Login", value: req.cookies});
}) 

function Remember (req, res, next)
{
    const {username, password, remember} = req.body;

    if(username !== JsonData.admin.username || password !== JsonData.admin.password)
    {
        res.cookie('username', '');
        res.cookie('password', '');
        res.header.username = '';
        res.header.password = '';
        return res.send("Wrong username  or password");
    }
    else
    {
        if(remember === "on")
        {
            res.cookie('username', username)
            res.cookie('password', password);
        }
        else 
        {
            res.clearCookie('username');
            res.clearCookie('password');
            res.header.username = username;
            res.header.password = password;
        }
    }

    next();
}


route.post('/postLogin', Remember,function(req, res)
{
   res.redirect('/admin'); 
})

module.exports = route;
