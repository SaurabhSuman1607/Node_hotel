// var fs = require("fs");
// var os = require("os");
// var notes = require("./notes.js");
// var _ = require("lodash");
// // function callback() {
// //   console.log("the successfull addition has been happened");
// // }

// // function add(a, b, callback) {
// //   let ans = a + b;
// //   console.log(ans);
// //   callback();
// // }

// // add(5, 6, callback);

// // var user = os.userInfo();

// // console.log(user.username);

// // fs.appendFile("greeting.txt", "Hi man this is Saurabh \n ", () => {
// //   console.log("the file has been created");
// // });

// //   console.log(notes.add(23, 45));
// // console.log(notes.divide(53, 34));
// // console.log(notes.multiply(23, 45));
// // console.log(notes.subtract(23, 45));

// var data = ["saurabh", 23, "Male", false, 23, 23, 23, "Saurabh", 222];

// console.log(_.uniq(data));

var express = require("express");
var app = express();
const db = require("./db");
const bodyParser = require("body-parser");
var Person = require("./Models/persons.js");
var Menu = require("./Models/Menu.js");
const personRoutes = require("../Proj_2/Routes/personRoutes.js");
const menuRoutes = require("../Proj_2/Routes/menuRotes.js");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello from the hotel");
});

app.get("/about", (req, res) => {
  const me = {
    name: "saurabh",
    age: 25,
    sex: "male",
  };
  res.send(`Hello from the about page owne and I AM :-- ${JSON.stringify(me)}`);
});

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `the requested ${req.url} is not found`,
  });
});

app.listen(3000, () => {
  console.log("the server is up and running : ");
});
