const express = require("express");
const routes = express.Router();
var Person = require("../Models/persons");

routes.post("/", async (req, res) => {
  try {
    const body = req.body;

    const newPerson = new Person(body);

    const saved = await newPerson.save();
    console.log("Data Saved");
    res.status(201).json({ status: "successfull", message: saved });
  } catch (err) {
    console.log("Interval server error : " + err);
    res.status(500).json({ status: "failed" });
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
