const express = require("express");
const fs = require("fs");

const route = express.Router();

route.get("/", function (req, res) {
  res.render("register", { title: "Register", layout: false });
});

route.post("/", function (req, res) {
  let { name, email, attend } = req.body;

  attend = attend === "on" ? true : false;

  fs.readFile("listUser.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      let obj = JSON.parse(data);
      let value = {
        name,
        email,
        attend,
      };
      obj.user.push(value);
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

  res.send(`Wellcome ${name} (${email})`);
});

module.exports = route;
