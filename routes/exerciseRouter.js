const express = require("express");
const router = express.Router();

const ExcerciseModel = require("../model/exercise");

// router.get("/", (req, res) => {
//   console.log("exercise Home");
//   res.send("exercise Home");
// });

router.get("/", async (req, res) => {
  try {
    res.status(200).json(await ExcerciseModel.find());
  } catch (e) {
    res.status(400);
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await ExcerciseModel.findById(req.params.id));
  } catch (e) {
    res.status(400);
  }
});

router.post("/add", async (req, res) => {
  const excercise = new ExcerciseModel({
    userName: req.body.userName,
    description: req.body.description,
    duration: req.body.duration,
    date: Date.parse(req.body.date),
  });

  try {
    const savedExer = await excercise.save();
    res.status(201).json(savedExer);
  } catch (e) {
    res.status(400);
    console.log(e);
  }
});

// ! Deleting multiple records based on ID's
router.delete("/delete/many", async (req, res) => {
  // console.log(req.body);
  await ExcerciseModel.deleteMany({ _id: { $in: req.body } })
    .then((resp) => {
      console.log(resp);
      res.status(200).json({ msg: "Deleted" });
    })
    .catch((e) => {
      console.log(e);
      res.status(400);
    });
});

router.post("/update/:id", async (req, res) => {
  const exercise = await ExcerciseModel.findById(req.params.id);
  exercise.userName = req.body.userName;
  exercise.description = req.body.description;
  exercise.duration = req.body.duration;
  exercise.date = Date.parse(req.body.date);
  exercise
    .save()
    .then((data) => {
      res.json(data);
      // console.log(data);
    })
    .catch((e) => {
      res.status(400);
    });
});

router.delete("/delete/:id", async (req, res) => {
  ExcerciseModel.findByIdAndDelete(req.params.id, null, (err, doc) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    if (doc === null) {
      return res.status(404).json({ msg: "Document not found" });
    }

    // console.log("deleted");
    res.status(200).json({ msg: "Deleted" });
  });
});

module.exports = router;
