const JsonData = require('../listUser.json');


module.exports.adminverify = function(req, res, next)
{
    const {username, password} = JsonData.admin;
    if((req.cookies.username === username && req.cookies.password === password) || (res.header.username === username && res.header.password === password))
    {
        next();
    }
    else
    {
       return res.send('You dont have right to access this page!');
    }
}