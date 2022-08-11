const express = require("express");
const router = express.Router();

const UserModel = require("../model/user");

// router.get("/", (req, res) => {
//   console.log("users Home");
//   res.send("users Home");
// });

router.get("/", async (req, res) => {
  try {
    res.status(200).json(await UserModel.find().sort({ userName: 1 }));
  } catch (e) {
    res.status(400);
  }
});

router.post("/add", async (req, res) => {
  const user = new UserModel({
    userName: req.body.userName,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

router.delete("/delete/:id", async (req, res) => {
  UserModel.findByIdAndDelete(req.params.id, null, (err, doc) => {
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
