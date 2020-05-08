const express = require('express');
const JsonData = require('../listUser.json');
const fs = require('fs');

const route = express.Router();


route.get('/', function(req, res)
{
    res.render('admin/home', {
        title: "Home", 
        layout: 'mainAdmin'
    });
});

route.get('/admin', function(req, res)
{
    const data = JsonData.user;
    
    res.render('admin/list', {
        title: "List User", 
        layout: 'mainAdmin', 
        data
    });
});

route.get('/config', function(req, res)
{
    res.render('admin/config', {
        title: "Config",
        layout: 'mainAdmin',
    });
});

route.post('/config', function(req, res)
{
    const {homeContent, resJoin, resNotJoin} = req.body;

    fs.readFile("configContent.json", "utf8", function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          let obj = JSON.parse(data);
          let value = {
            homeContent,
            resJoin,
            resNotJoin,
          };
          obj = value;
          let json = JSON.stringify(obj);
          fs.writeFile("configContent.json", json, "utf8", (err) => {
            if (err) {
              throw err;
            } else {
              console.log("Success!");
            }
          });
        }
    });

    res.redirect('/admin');
});

route.get('/profile', function(req, res)
{
    const username = JsonData.admin.username;
    const password = JsonData.admin.password;

    res.render('admin/profile', {
        title: 'Profile',
        layout: "mainAdmin",
        username,
        password
    });
});


route.post('/profile', function(req, res)
{

    const username = req.body.usernameAdmin;
    const password = req.body.passwordAdmin;

    fs.readFile("listUser.json", "utf8", function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          let obj = JSON.parse(data);
          let value = {
            username,
            password,
          };
          obj.admin = value;
          let json = JSON.stringify(obj);
          fs.writeFile("listUser.json", json, "utf8", (err) => {
            if (err) {
              throw err;
            } else {
              console.log("Success!");
            }
          });
        }
      });
      
    res.redirect('/admin');
});

module.exports = route;
