const express = require("express");
const router = express.Router();
var Menu = require("../Models/Menu");
router.post("/", async (req, res) => {
  try {
    const newMenu = req.body;

    const newMenuInstance = new Menu(newMenu);

    const saved = await newMenuInstance.save();
    console.log("data saved");
    res.status(201).json({ status: "Successfull", message: saved });
  } catch (err) {
    console.log("Error while storing data : " + err);
    res
      .status(404)
      .json({ status: "Failed", message: "Error while doing this " });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("data retrieved successfully");
    res.status(200).json({ status: "Successfull", data });
  } catch (err) {
    console.log("Error in finding the data : " + err);
    res.status(500).json({ status: "Failed", message: "Not able to retrieve" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const newTaste = req.params.taste;

    // Validate the taste parameter
    if (["sour", "spicy", "sweet"].includes(newTaste)) {
      const tasteCheck = await Menu.find({ taste: newTaste });
      console.log("Data Retrieved");
      res.status(200).json({ status: "successfull", data: tasteCheck });
    } else {
      console.log("Invalid taste provided");
      res
        .status(404)
        .json({ status: "failed", message: "We do not have this taste" });
    }
  } catch (err) {
    console.log("Error in the request: " + err);
    res.status(500).json({ status: "failed", message: "Error in request" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const ids = req.params.id;
    const toUpdated = req.body;

    const updatedData = await Menu.findByIdAndUpdate(ids, toUpdated, {
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

router.delete("/:id", async (req, res) => {
  try {
    const deleteId = req.params.id;

    const deleted = await Menu.findByIdAndDelete(deleteId);
    if (!deleted) {
      console.log("Data wasn't delete: " + deleted);
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

module.exports = router;
