const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/user_model");
const router = express.Router();
const multer = require("multer");
router.use(express.json());
var authenticateUser = require("./authenticationHelper").authenticateUser;
router.use(express.urlencoded({ extended: true }));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  "/update/image",
  authenticateUser,
  upload.single("img"),
  async (req, res) => {
    await User.findOneAndUpdate(
      { username: req.body.email },
      { $set: { imageURL: req.file.originalname } },
      (err, user) => {
        if (err) res.json({ err: err });
        else
          res.json({
            gama: "gama",
            user: user,
          });
      }
    ).clone();
  }
);

router.post("/update", (req, res) => {
  const profile = new User({
    fullname: fullname.trim(),
    phone_no: phone_no.trim(),
    email: email.trim(),
    role: req.body["role"],
    imageURL: req.body["imageURL"],
  });

  profile.save((err) => {
    if (err) res.json(err);
    else
      res.json({
        user: {
          _id: new_user._id,
          fullname: profile.fullname,
          email: profile.email,
          phone_no: profile.phone_no,
          password: profile.password,
          imgUrl: profile.imageURL,
        },
        success: true,
        fullname: fullname.trim(),
      });
  });
});

router.patch("/update/profile", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ username: req.body.email }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ msg: "user not found " });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
