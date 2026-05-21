const express = require("express");
const routes = express.Router();
var Person = require("../Models/persons");
var { jwtAuthMiddleware, generateToken } = require("../jwt");

routes.post("/signUp", async (req, res) => {
  try {
    const body = req.body;
    const exsist = await Person.findOne({ username: body.username });

    if (exsist) {
      return res
        .status(401)
        .json({ message: "username Already Existing in the db" });
    }
    const newPerson = new Person(body);

    const saved = await newPerson.save();

    // Create token
    const token = generateToken({ id: saved._id, user: saved.username });
    res.status(201).json({ response: saved, token: token });
  } catch (err) {
    console.log("Interval server error : " + err);
    res.status(500).json({ status: "failed" });
  }
});

routes.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const user = req.user;
    console.log("User data : ", user);

    const userId = user.id;
    const prof = await Person.findById(userId);

    res.status(200).json({ data: prof });
  } catch (err) {
    res.status(404).json({ data: "Internal server Error " });
  }
});

routes.post("/login", async (req, res) => {
  try {
    //take username and password
    const { username, password } = req.body;

    // Find the username in the db

    const user = await Person.findOne({ username });

    //If not found
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "User not found" });
    }

    // Create a payloa for token
    const payLoad = {
      id: user.id,
      user: user.username,
    };

    //Create a token using Payload
    const token = generateToken(payLoad);

    //Send the response
    res.json({ token });
  } catch (err) {
    console.log("Error : ", err);
    res.status(500).json({ error: "Invalid username or password" });
  }
});

routes.get("/:worktype", async (req, res) => {
  try {
    const newWork = req.params.worktype;
    if (newWork == "Chef" || newWork == "Manager" || newWork == "Waiter") {
      const newData = await Person.find({ work: newWork });
      console.log("data Retrieved");
      res.status(200).json({ status: "successfull", newData });
    } else {
      res.status(404).json({ status: "failed", message: "Not Found" });
    }
  } catch (err) {
    console.log("Error in retrieving Data : " + err);
    res
      .status(500)
      .json({ status: "Failed", message: "Error in retrieving the data" });
  }
});

routes.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log("Error in Fetching data");
    res.status(404).json({ err });
  }
});

routes.put("/:id", async (req, res) => {
  try {
    const ids = req.params.id;
    const toUpdated = req.body;

    const updatedData = await Person.findByIdAndUpdate(ids, toUpdated, {
      new: true,
      runValidators: true,
    });

    if (!updatedData) {
      console.log("Data wasn't updated : " + updatedData);
      res
        .status(404)
        .json({ status: "failed", message: "Not being able to update" });
    } else {
      res.status(200).json({ status: "successfull", message: updatedData });
    }
  } catch (err) {
    console.log("Error in the request: " + err);
    res.status(500).json({ status: "failed", message: "Error in request" });
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const deleteId = req.params.id;

    const deleted = await Person.findByIdAndDelete(deleteId);
    if (!deleted) {
      console.log("Data wasn't deleted : " + deleted);
      return res
        .status(404)
        .json({ status: "failed", message: "Not being able to delete" });
    }

    res
      .status(200)
      .json({ status: "successfull", message: "successfully Deleted" });
  } catch (err) {
    console.log("Error in the request: " + err);
    res.status(500).json({ status: "failed", message: "Error in request" });
  }
});

module.exports = routes;
